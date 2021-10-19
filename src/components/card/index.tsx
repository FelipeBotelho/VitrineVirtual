import React from "react";
import {
    Badge,
    Box,
    Image,
    Text,
    Stack,
    Icon,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import { RiStarFill, RiShoppingCartLine } from "react-icons/ri";

import { currencyFormatter } from "../../utils/formatter";
import ProductModal from "../modal";
import { ProductModel } from "../../types/products";
import { useCart } from "../../contexts/cart";

interface CardProps {
    product: ProductModel;
}

export default function Card({ product }: CardProps): React.ReactElement {
    const PropsModal = useDisclosure();
    const { handleAddCart } = useCart();
    const { onOpen } = PropsModal;
    const { foto, nome, preco, quantidade, id } = product;

    return (
        <>
            <ProductModal product={product} modalProps={PropsModal} />
            <Box
                position="relative"
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                pb={8}
                bg="white"
                role="group"
            >
                <Stack
                    direction="row"
                    align="flex-end"
                    justify="space-between"
                    mb="5px"
                >
                    <Badge
                        w="fit-content"
                        borderRadius="full"
                        px="2"
                        bg={quantidade === 0 ? "red.500" : "green.500"}
                        color="white"
                    >
                        {quantidade === 0 ? "Sem estoque" : "Novo"}
                    </Badge>

                    <Box px="2" mb="5px" h="100%">
                        {Array(5)
                            .fill("")
                            .map((_, i) => (
                                <Icon
                                    key={i}
                                    as={RiStarFill}
                                    color="green.500"
                                />
                            ))}
                    </Box>
                </Stack>

                <Box as="button" type="button" onClick={onOpen}>
                    <Image src={foto} alt={nome} h="200px" />

                    <Stack p="6">
                        <Text
                            fontWeight="semibold"
                            as="h3"
                            lineHeight="tight"
                            noOfLines={3}
                        >
                            {nome}
                        </Text>

                        <Text
                            fontWeight="bold"
                            as="h4"
                            lineHeight="tight"
                            fontSize="lg"
                            color="blue.600"
                        >
                            {currencyFormatter(preco)}
                        </Text>
                    </Stack>
                </Box>

                <Box position="absolute" w="100%" left="0" bottom="0">
                    <Button
                        w="100%"
                        color="white"
                        colorScheme="red"
                        borderRadius="0"
                        disabled={quantidade === 0}
                        onClick={() => handleAddCart(id)}
                    >
                        <Icon as={RiShoppingCartLine} mr="10px" /> Comprar
                    </Button>
                </Box>
            </Box>
        </>
    );
}
