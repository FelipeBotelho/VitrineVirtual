// import React from "react";
// import { useAuth } from "../../contexts/auth";

// const Menu: React.FC = () => {
//     const { signed, user } = useAuth();
//     return (
//         signed ? <>{user.user}</> : <>Não tem Nome</>
//     );
// }

// export default Menu;

import React from "react";
import { NavLink } from "react-router-dom";

import {
    HStack,
    Box,
    Image,
    Text,
    Divider,
    Center,
    Icon,
    Avatar,
    Link,
    Button,
} from "@chakra-ui/react";

import { RiShoppingCartLine } from "react-icons/ri";

import logo from "../../assets/images/cast-logo2.png";
import { useCart } from "../../contexts/cart";

export default function Menu(): React.ReactElement {
    const {
        disclosure: { onOpen },
        cart,
    } = useCart();

    return (
        <Box as="header" position="fixed" w="100%" top="0" zIndex="999">
            <Box bg="gray.300">
                <HStack w="80%" m="0 auto" justify="center" p="3px 0">
                    <Text fontSize="xs">Desconto na primeira compra</Text>
                    <Center h="15px">
                        <Divider orientation="vertical" borderColor="gray.500" />
                    </Center>
                    <Text fontSize="xs">Frete grátis acima de R$99 🚚</Text>
                    <Center h="15px">
                        <Divider orientation="vertical" borderColor="gray.500" />
                    </Center>
                    <Text fontSize="xs">Parcelamento em até 10x sem juros</Text>
                </HStack>
            </Box>

            <Box as="nav" bg="gray.500" color="gray.400">
                <HStack w="80%" h="70px" m="0 auto" justify="center">
                    <Box w="40%"></Box>
                    <Box textAlign="center" w="18%">
                        <Link as={NavLink} to="/" activeClassName="none">
                            <Image src={logo} m="0 auto" h="50px" />
                        </Link>
                    </Box>
                    <HStack w="40%" justifyContent="flex-end" spacing="md">
                        <Text as="span" d="flex" alignItems="center">
                            <Avatar
                                name="Vinicius Soares"
                                mr="10px"
                                borderWidth="2px"
                                borderColor="gray.400"
                            />
                            Vinicius Soares
                        </Text>
                        <Button
                            position="relative"
                            type="button"
                            onClick={onOpen}
                            colorScheme="none"
                            color="gray.400"
                        >
                            <Icon as={RiShoppingCartLine} boxSize="25px" />
                            {cart.length > 0 && (
                                <Text
                                    as="sup"
                                    position="absolute"
                                    right="5px"
                                    d="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    backgroundColor="red.500"
                                    color="white"
                                    h="20px"
                                    w="20px"
                                    borderRadius="50%"
                                >
                                    {cart.length}
                                </Text>
                            )}
                        </Button>
                    </HStack>
                </HStack>
            </Box>
        </Box>
    );
}
