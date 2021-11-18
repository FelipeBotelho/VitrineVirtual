import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import { Button, Icon, Image, Stat, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useCart } from "../../contexts/cart";
import { useProducts } from "../../contexts/products";
import { IoIosRemove, IoIosAdd } from "react-icons/io";
import { currencyFormatter } from "../../utils/formatter";
import { RiShoppingCartLine } from "react-icons/ri";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../contexts/auth";

export default function Comprar() {

    const {
        cart,
        handleRemoveCart,
        handleAddCart,
    } = useCart();
    const { products } = useProducts();
    const [loading, setLoading] = useState<boolean>(false);

    const { user } = useAuth();

    const [detalhesCompra, setDetalhesCompra] = useState([]);

    const dadosPagamento = {
        idUsuario: user.id,
        idPagamento: 1,
        enderecoEntrega: "",
        cidadeEntrega: "",
        cepEntrega: "",
        total:0,
        compra: []
    }

    useEffect(() => {
        const compra: any = obterDetalhesCompra();
        setDetalhesCompra(compra);
        console.log(compra);
    }, [cart])

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
        nome: Yup.string().required("Este campo é obrigatório!"),
        preco: Yup.number().required("Este campo é obrigatório!"),
        foto: Yup.string().required("Este campo é obrigatório!"),
        descricao: Yup.string().required("Este campo é obrigatório!"),
        quantidade: Yup.number().required("Este campo é obrigatório!"),
    });

    const handleDisabled = (id: number) => {
        const productIndex = products.findIndex((item) => item.id === id);
        if (products[productIndex].quantidade === 0) {
            return true;
        }

        return false;
    };

    const obterValorTotal = () => {
        let ValorFinal = 0;
        cart.forEach(element => {
            ValorFinal += element.quantidade * element.preco;
        });
        return ValorFinal;
    }

    const handleSubmit = () => {

    }


    return (
        cart.length > 0 ?
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
                    {/* <Formik
                        initialValues={dadosPagamento}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>

                            <div className="form-group">
                                <label htmlFor="nome">Nome do Produto</label>
                                <Field name="nome" type="text" className="form-control" />
                                <ErrorMessage
                                    name="nome"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="preco">Preço</label>
                                <Field name="preco" type="number" className="form-control" />
                                <ErrorMessage
                                    name="preco"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="descricao">Descrição do Produto</label>
                                <Field name="descricao" as="textarea" type="text" className="form-control" />
                                <ErrorMessage
                                    name="descricao"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="foto">Url da Imagem</label>
                                <Field name="foto" type="tex" className="form-control" />
                                <ErrorMessage
                                    name="foto"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="quantidade">Quantidade em Estoque</label>
                                <Field name="quantidade" type="number" className="form-control" />
                                <ErrorMessage
                                    name="quantidade"
                                    component="div"
                                    className="alert alert-danger"
                                />
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
                    </Formik> */}
                    <div className="col-12">

                    </div>
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
            </div> :
            (<Flex style={{ height: "98vh" }} h="100%" justify="center" alignItems="center">
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
            </Flex>)
    );
}
