import {
    Button,
    Image,
    Icon,
    Divider,
    SimpleGrid,
    Modal,
    ModalOverlay,
    ModalContent,
    Box,
    UseDisclosureProps,
    ModalCloseButton,
    ModalBody,
    Text,
    Stack,
    Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { RiShoppingCartLine, RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { useCart } from "../../contexts/cart";
import { useProducts } from "../../contexts/products";

import { ProductModel } from "../../types/products";
import { currencyFormatter } from "../../utils/formatter";

interface ProductModalProps {
    product: ProductModel;
    modalProps: UseDisclosureProps;
    isFavorito: boolean;
}

export default function ProductModal({
    product,
    modalProps,
    isFavorito
}: ProductModalProps) {
    const { handleAddCart } = useCart();
    const { favoritarProduto, desfavoritarProduto, obterFavoritos, obterUltimoIdFavorito } = useProducts();
    const { signed, user } = useAuth();
    const history = useHistory();
    const { isOpen, onClose } = modalProps;
    const {
        descricao,
        nome,
        preco,
        foto,
        quantidade,
        id,
    } = product;

    const handleAddFavorito = async (id: number) => {
        debugger;
        if (!signed) {
            history.push("/login");
            return;
        }

        var lastIdForAll = await obterUltimoIdFavorito();
        let obj = {};

        obj = {
            id: lastIdForAll + 1,
            idProduto: id,
            idUsuario: user.id
        }
        await favoritarProduto(obj);
    }

    const handleRemoveFavorito = async (id: number) => {
        if (!signed) {
            history.push("/login");
            return;
        }
        const favoritos = await obterFavoritos(user.id);
        const favorito = favoritos.find((x: any) => x.idProduto == id && x.idUsuario == user.id).id;
        await desfavoritarProduto(favorito);
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
                <ModalContent>
                    <ModalCloseButton onClick={onClose} mr="10px" />
                    <ModalBody p={8} mt="10px">
                        <SimpleGrid columns={2} spacing={10}>
                            <Box>
                                <Image src={foto} w="320px" margin="0 auto" />

                                <Divider mt="md" />

                            </Box>
                            <Stack textAlign="center">
                                <Text
                                    as="h2"
                                    fontWeight="bold"
                                    fontSize="lg"
                                    lineHeight="tight"
                                >
                                    {nome}
                                </Text>
                                <Text as="h3" fontWeight="semibold" color="gray.400">
                                    {currencyFormatter(preco)}
                                    <Text as="span" ml="md">
                                        10 x {currencyFormatter((preco / 10).toFixed(2))}
                                    </Text>
                                </Text>
                                <div style={{ display: "flex", margin: "0", padding: "0" }}>
                                    <Button
                                        style={{ width: "79%" }}
                                        m="25px 5px 10px 0px"
                                        color="white"
                                        colorScheme="red"
                                        disabled={quantidade === 0}
                                        onClick={() => handleAddCart(id)}
                                    >
                                        <Icon as={RiShoppingCartLine} mr="10px" /> Comprar
                                    </Button>

                                    <Tooltip label={isFavorito ? "Desfavoritar Item" : "Favoritar Item"}>
                                        <Button
                                            style={{ width: "20%" }}
                                            m="25px 0 10px !important"
                                            color="white"
                                            colorScheme="red"
                                            onClick={() => isFavorito ? handleRemoveFavorito(id) : handleAddFavorito(id)}
                                        >
                                            <Icon as={isFavorito ? RiThumbUpLine : RiThumbUpFill} mr="10px" />
                                        </Button>
                                    </Tooltip>
                                </div>


                                <Divider />

                                <Stack textAlign="left">
                                    <Text as="h4" fontWeight="semibold">
                                        Descrição:
                                    </Text>
                                    <Text fontSize="sm">{descricao}</Text>
                                </Stack>
                            </Stack>
                        </SimpleGrid>

                        <Divider mt="md" />

                        <Stack
                            textAlign="center"
                            direction="row"
                            justify="space-around"
                            mt="md"
                        >
                            <Box maxW="290px">
                                <Text as="h4" fontWeight="bold">
                                    ENTREGA
                                </Text>
                                <Text fontSize="sm">
                                    Entrega rápida para todo o Brasil. Simule o prazo com o seu
                                    CEP.
                                </Text>
                            </Box>

                            <Box maxW="290px">
                                <Text as="h4" fontWeight="bold">
                                    DEVOLUÇÕES
                                </Text>
                                <Text fontSize="sm">
                                    10 dias para devolver seu pedido, sem perrengue.
                                </Text>
                            </Box>

                            <Box maxW="290px">
                                <Text as="h4" fontWeight="semibold">
                                    DÚVIDAS?
                                </Text>
                                <Text fontSize="sm">
                                    Estamos prontos para te atender no (XX) XXXX-XXXX de seg. a
                                    sex. 8h as 22h, sáb 12h as 20h.
                                </Text>
                            </Box>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
