import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import { Button, Icon, Image, Stat, StatLabel, StatNumber, Text, useToast, UseToastOptions } from "@chakra-ui/react";
import React, { useState } from "react";
import { useCart } from "../../contexts/cart";
import { useProducts } from "../../contexts/products";
import { IoIosRemove, IoIosAdd } from "react-icons/io";
import { currencyFormatter } from "../../utils/formatter";
import { RiShoppingCartLine } from "react-icons/ri";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../contexts/auth";
import Banner from "../../components/banner";

export default function Comprar() {

    const {
        cart,
        handleRemoveCart,
        handleAddCart,
        cleanCart
    } = useCart();
    const { products, realizarCompra } = useProducts();
    const [loading, setLoading] = useState<boolean>(false);
    const [idPagamento, setIdPagamento] = useState<number>(1);
    const { user } = useAuth();
    const toast = useToast();

    const dadosPagamento = {
        idUsuario: user.id,
        idPagamento: 1,
        enderecoEntrega: "",
        cidadeEntrega: "",
        cepEntrega: "",
        numeroCartao: "",
        codigoSeguranca: "",
        total: 0,
        compra: []
    }

    const obterDetalhesCompra = () => {
        let compra: any[] = [];
        cart.forEach((element: any) => {
            compra.push({
                "idProduto": element.id,
                "quantidade": element.quantidade
            });
        });
        return compra;
    }

    const validationSchema = Yup.object().shape({
        enderecoEntrega: Yup.string().required("Este campo é obrigatório!"),
        cidadeEntrega: Yup.string().required("Este campo é obrigatório!"),
        cepEntrega: Yup.string().required("Este campo é obrigatório!"),
        idPagamento: Yup.number().required("Este campo é obrigatório!")
    });

    const handleDisabled = (id: number) => {
        const productIndex = products.findIndex((item) => item.id === id);
        if (products[productIndex].quantidade === 0) {
            return true;
        }

        return false;
    };

    const addCompra: UseToastOptions = {
        title: (idPagamento == 2 ? "Compra realizada com sucesso. Aguarde o envio do boleto no seu email para realizar o pagamento." : (idPagamento == 3 ? "Compra realizada com sucesso. Aguarde o envio da chave pix para pagamento no seu email." : "Compra realizada com sucesso!")),
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
    };

    const errCompra: UseToastOptions = {
        title: "Ocorreu um erro ao finalizar sua compra, tente novamente mais tarde",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
    };

    const handleChangePagamento = (e: any) => {
        const selected = e.target.value;
        setIdPagamento(+selected);
    }

    const obterValorTotal = () => {
        let ValorFinal = 0;
        cart.forEach(element => {
            ValorFinal += element.quantidade * element.preco;
        });
        return ValorFinal;
    }

    const handleSubmit = async (formValue: {
        idUsuario: number,
        idPagamento: number,
        enderecoEntrega: string,
        cidadeEntrega: string,
        cepEntrega: string,
        numeroCartao: string,
        codigoSeguranca: string,
        total: number,
        compra: any
    }) => {
        const { enderecoEntrega, cidadeEntrega, cepEntrega } = formValue;

        setLoading(true);
        const obj = {
            "idUsuario": user.id,
            "idPagamento": idPagamento,
            "dataCompra": new Date().toLocaleDateString(),
            "enderecoEntrega": enderecoEntrega,
            "cidadeEntrega": cidadeEntrega,
            "cepEntrega": cepEntrega,
            "total": obterValorTotal(),
            "compra": obterDetalhesCompra()
        };

        const result = await realizarCompra(obj);
        setLoading(false);
        if (result) {
            cleanCart();
            toast(addCompra);
        } else {
            toast(errCompra);
        }
    }

    return (

        cart.length > 0 ?
            <>
                <Banner />
                <div className="row" style={{ margin: "15px" }}>
                    <div className="col col-6">
                        <Heading
                            as="h3"
                            borderBottom="5px solid"
                            borderColor="blue.600"
                            p="0 10px"
                            w="fit-content"
                        >
                            Dados de Pagamento
                        </Heading>
                        <Formik
                            initialValues={dadosPagamento}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form>

                                <div className="form-group">
                                    <label htmlFor="enderecoEntrega">Endereco de Entrega</label>
                                    <Field name="enderecoEntrega" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="enderecoEntrega"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cidadeEntrega">Cidade</label>
                                    <Field name="cidadeEntrega" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="cidadeEntrega"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cepEntrega">CEP</label>
                                    <Field name="cepEntrega" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="cepEntrega"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="idPagamento">Tipo de Pagamento</label>
                                    <Field name="idPagamento" value={idPagamento} as="select" className="form-control" onChange={handleChangePagamento}>
                                        <option value="1" >Cartão</option>
                                        <option value="2" >Boleto</option>
                                        <option value="3" >Pix</option>
                                    </Field>
                                    <ErrorMessage
                                        name="idPagamento"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                    {idPagamento == 1 &&
                                        <>
                                            <div className="col-12" style={{ padding: 0, display: "flex" }}>

                                                <div className="col-8" style={{ margin: 0, paddingLeft: 0 }}>
                                                    <label htmlFor="numeroCartao">Número do Cartão</label>
                                                    <Field name="numeroCartao" type="text" className="form-control" />
                                                </div>
                                                <div className="col-4" style={{ padding: 0, margin: 0 }}>
                                                    <label htmlFor="codigoSeguranca">Código de Segurança</label>
                                                    <Field name="codigoSeguranca" type="text" className="form-control" />
                                                </div>
                                            </div>

                                        </>
                                    }
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                        {loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>Comprar</span>
                                    </button>
                                </div>


                            </Form>
                        </Formik>
                    </div>
                    <div className="col col-6">
                        <Heading
                            as="h3"
                            borderBottom="5px solid"
                            borderColor="blue.600"
                            p="0 10px"
                            w="fit-content"
                        >
                            Detalhes da Compra
                        </Heading>
                        <div className="col-12" style={{ maxHeight: "500px", overflow: "overlay" }}>
                            <br />
                            {cart.map((item) => (
                                <Box style={{ background: "#fff", border: "0.5px solid #ccc", marginBottom: "5px" }} key={`cart-${item.id}`} p={4} boxShadow="md">
                                    <Stack direction="row" spacing="md">
                                        <Box w="60px">
                                            <Image src={item.foto} />
                                        </Box>
                                        <Box flex="1">
                                            <Heading as="h4" noOfLines={1} fontSize="sm">
                                                {item.nome}
                                            </Heading>
                                            <Box>
                                                <Stack spacing="sm" direction="row" mt="md">
                                                    <Button
                                                        type="button"
                                                        p="0"
                                                        minW="0"
                                                        h="22px"
                                                        w="22px"
                                                        colorScheme="red"
                                                        variant="outline"
                                                        onClick={(): void => handleRemoveCart(item.id)}
                                                    >
                                                        <Icon as={IoIosRemove} />
                                                    </Button>
                                                    <Text as="span">{item.quantidade}</Text>
                                                    <Button
                                                        type="button"
                                                        p="0"
                                                        minW="0"
                                                        h="22px"
                                                        w="22px"
                                                        colorScheme="red"
                                                        variant="outline"
                                                        isDisabled={handleDisabled(item.id)}
                                                        onClick={(): void => handleAddCart(item.id)}
                                                    >
                                                        <Icon as={IoIosAdd} />
                                                    </Button>
                                                </Stack>
                                            </Box>
                                            <Box>
                                                <Text as="span"> {item.quantidade} x {currencyFormatter(item.preco)} = {currencyFormatter(item.quantidade * item.preco)}</Text>
                                            </Box>
                                        </Box>
                                    </Stack>
                                </Box>
                            ))}
                        </div>
                        <Stat style={{ paddingLeft: "20px" }}>
                            <StatLabel>Valor Total</StatLabel>
                            <StatNumber>{currencyFormatter(obterValorTotal())}</StatNumber>
                        </Stat>
                    </div>
                </div>
            </> :
            (
                <>
                    <Banner />
                    <Flex style={{ height: "98vh" }} h="100%" justify="center" alignItems="center">
                        <br /><br />
                        <Stack spacing="md" alignItems="center">
                            <Icon as={RiShoppingCartLine} boxSize="96px" />
                            <Heading as="h3" fontWeight="semibold" fontSize="lg">
                                Seu carrinho está vazio
                            </Heading>
                            <Text>
                                Navegue pelos nossos produtos e adicione no carrinho.
                            </Text>
                        </Stack>
                    </Flex>
                </>)
    );
}
