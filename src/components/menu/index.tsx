/* eslint-disable jsx-a11y/accessible-emoji */
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
import { NavLink, useHistory } from "react-router-dom";

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
    Menu as MenuB,
    MenuList,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuDivider
} from "@chakra-ui/react";

import { RiShoppingCartLine } from "react-icons/ri";

import logo from "../../assets/images/cast-logo2.png";
import { useCart } from "../../contexts/cart";
import { useAuth } from "../../contexts/auth";


export default function Menu(): React.ReactElement {
    const {
        disclosure: { onOpen },
        cart,
    } = useCart();

    const { signed, user, Logout } = useAuth();
    const history = useHistory();
    const handleLogin = () => {
        history.push("/login");
    }

    const handleLogout = () => {
        Logout();
        history.push("/login");
    }

    const UserMenu = () => {
        return (
            signed ?
                <MenuB>
                    <MenuButton>
                        <Text as="span" d="flex" alignItems="center">
                            <Avatar
                                name={user.name}
                                mr="10px"
                                borderWidth="2px"
                                borderColor="gray.400"
                            />
                            {user.name}
                        </Text>
                    </MenuButton>
                    <MenuList>
                        <MenuGroup title="Profile">
                            <MenuItem>Minha Conta</MenuItem>
                            <MenuItem>Meus Pedidos </MenuItem>
                        </MenuGroup>
                        <MenuDivider />
                        <MenuGroup title="Session">
                            <MenuItem onClick={handleLogout}>Log-out</MenuItem>
                        </MenuGroup>
                    </MenuList>
                </MenuB >
                :
                <Button colorScheme="blue" onClick={handleLogin}>LogIn</Button>
        )
    }


    return (
        <Box as="header" position="static" w="100%" top="0" zIndex="999">
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
                        <UserMenu></UserMenu>
                        {signed ? <Button
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
                        </Button>: null}
                    </HStack>
                </HStack>
            </Box>
        </Box>
    );
}
