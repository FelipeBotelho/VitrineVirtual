import {
    Modal,
    ModalOverlay,
    ModalContent,
    UseDisclosureProps,
    ModalCloseButton,
    ModalBody,
    Grid,
    GridItem,
    Heading,
    UseToastOptions,
    useToast,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { ProductModel } from "../../types/products";
import { useProducts } from "../../contexts/products";

interface ProductModalProps {
    product: ProductModel;
    modalProps: UseDisclosureProps;
    isAdding: Boolean;
}

export default function AdminProductModal({
    product,
    isAdding,
    modalProps,
}: ProductModalProps) {
    const toast = useToast();
    const { isOpen, onClose } = modalProps;
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { addProduct, editProduct } = useProducts();
    const {
        id,
    } = product;

    const validationSchema = Yup.object().shape({
        nome: Yup.string().required("Este campo é obrigatório!"),
        preco: Yup.number().required("Este campo é obrigatório!"),
        foto: Yup.string().required("Este campo é obrigatório!"),
        descricao: Yup.string().required("Este campo é obrigatório!"),
        quantidade: Yup.number().required("Este campo é obrigatório!"),
    });

    const addProductToast: UseToastOptions = {
        title: isAdding ?  "Produto Incluido com Sucesso" : "Produto Alterado com Sucesso.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
    };

    const handleSubmit = async (formValue: { nome: string; preco: number, foto: string, descricao: string, quantidade: number }) => {
        const { nome, preco, foto, descricao, quantidade } = formValue;
        if (isAdding) {
            setLoading(true);
            const result = await addProduct({
                id,
                nome,
                preco,
                descricao,
                foto,
                quantidade
            });
            if (!result) {
                setLoading(false);
                setMessage("Erro ao cadastrar produto!");
            } else {
                setLoading(false);
                if (onClose) onClose();
                toast(addProductToast);
            }
        } else {
            setLoading(true);
            const result = await editProduct({
                id,
                nome,
                preco,
                descricao,
                foto,
                quantidade
            });
            if (!result) {
                setLoading(false);
                setMessage("Erro ao alterar produto!");
            } else {
                setLoading(false);
                if (onClose) onClose();
                toast(addProductToast);
            }
        }
    }

    return (
        <>
            <Modal
                isOpen={!!isOpen}
                onClose={() => onClose}
                scrollBehavior="inside"
                size="6xl"
                closeOnEsc
                closeOnOverlayClick
            >
                <ModalOverlay />
                <ModalContent style={{ height: "500px" }} >
                    <ModalCloseButton onClick={onClose} mr="10px" />
                    <ModalBody p={8} mt="10px">
                        <Heading
                            as="h3"
                            borderColor="blue.600"
                            p="0 10px"
                        >
                            {isAdding ? "Adicionar Novo Produto" : "Alterar Produto"}
                        </Heading>
                        <br />
                        <Formik
                            initialValues={product}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <Grid
                                    h="200px"
                                    templateRows="repeat(2, 1fr)"
                                    templateColumns="repeat(5, 1fr)"
                                    gap={4}
                                >
                                    <GridItem rowSpan={1} colSpan={3} >
                                        <div className="form-group">
                                            <label htmlFor="nome">Nome do Produto</label>
                                            <Field name="nome" type="text" className="form-control" />
                                            <ErrorMessage
                                                name="nome"
                                                component="div"
                                                className="alert alert-danger"
                                            />
                                        </div>
                                    </GridItem>
                                    <GridItem rowSpan={1} colSpan={2} >
                                        <div className="form-group">
                                            <label htmlFor="preco">Preço</label>
                                            <Field name="preco" type="number" className="form-control" />
                                            <ErrorMessage
                                                name="preco"
                                                component="div"
                                                className="alert alert-danger"
                                            />
                                        </div>
                                    </GridItem>
                                    <GridItem rowSpan={1} colSpan={3} >
                                        <div className="form-group">
                                            <label htmlFor="descricao">Descrição do Produto</label>
                                            <Field name="descricao" as="textarea" type="text" className="form-control" />
                                            <ErrorMessage
                                                name="descricao"
                                                component="div"
                                                className="alert alert-danger"
                                            />
                                        </div>
                                    </GridItem>
                                    <GridItem rowSpan={1} colSpan={2} >
                                        <div className="form-group">
                                            <label htmlFor="foto">Url da Imagem</label>
                                            <Field name="foto" type="tex" className="form-control" />
                                            <ErrorMessage
                                                name="foto"
                                                component="div"
                                                className="alert alert-danger"
                                            />
                                        </div>
                                    </GridItem>
                                    <GridItem rowSpan={1} colSpan={5} >
                                        <div className="form-group">
                                            <label htmlFor="quantidade">Quantidade em Estoque</label>
                                            <Field name="quantidade" type="number" className="form-control" />
                                            <ErrorMessage
                                                name="quantidade"
                                                component="div"
                                                className="alert alert-danger"
                                            />
                                        </div>
                                    </GridItem>
                                    <GridItem rowSpan={1} colSpan={5} >
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                                {loading && (
                                                    <span className="spinner-border spinner-border-sm"></span>
                                                )}
                                                {isAdding ? <span>Adicionar</span> : <span>Alterar</span>}
                                            </button>
                                        </div>
                                        {message && (
                                            <div className="form-group">
                                                <div className="alert alert-danger" role="alert">
                                                    {message}
                                                </div>
                                            </div>
                                        )}
                                    </GridItem>
                                </Grid>
                            </Form>
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
