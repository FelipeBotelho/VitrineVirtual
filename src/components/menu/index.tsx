import React, { ReactNode } from "react";
import { NavLink as ReactNavLink, useHistory } from "react-router-dom";

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
    MenuDivider,
    useColorModeValue,
    Flex,
    IconButton,
    useDisclosure,
    Stack
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';


import { RiShoppingCartLine } from "react-icons/ri";

import logo from "../../assets/images/cast-logo2.png";
import { useCart } from "../../contexts/cart";
import { useAuth } from "../../contexts/auth";


export default function Menu(): React.ReactElement {
    const { signed, user, Logout } = useAuth();
    const history = useHistory();

    const Links = [{ label: 'Dashboard', href: '/' }, { label: 'Administração', href: '/admin' }];

    const {
        disclosure: { onOpen },
        cart,
    } = useCart();


    const handleLogin = () => {
        history.push("/login");
    }

    const handleLogout = () => {
        Logout();
        history.push("/login");
    }

    const handleGoTo: any = (src: string) => {
        history.push(src);
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
                    <MenuList sx={{ color: "#000" }}>
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

    const NavLink = ({ children }: { children: any }) => (
        <Box
            sx={{cursor: "pointer"}}
            px={2}
            py={1}
            key={children.href}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            onClick={() => handleGoTo(children.href)}
        >
            {children.label}
        </Box>
    );


    return (
        <>
            <Box sx={{ color: "#fff" }} bg={useColorModeValue('gray.700', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>Logo</Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link.href} >{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <UserMenu></UserMenu>
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
                    </Flex>
                </Flex>
            </Box>
        </>
        // <Box as="header" position="static" w="100%" top="0" zIndex="999">
        //     <Box as="nav" bg="gray.500" color="gray.400">
        //         <HStack w="80%" h="70px" m="0 auto" justify="center">
        //             <Box w="40%"></Box>
        //             <Box textAlign="center" w="18%">
        //                 <Link as={ReactNavLink} to="/" activeClassName="none">
        //                     <Image src={logo} m="0 auto" h="50px" />
        //                     Laticinios Vieira
        //                 </Link>
        //             </Box>
        //             <HStack w="40%" justifyContent="flex-end" spacing="md">
        //                 <UserMenu></UserMenu>
        //                 {signed ? <Button
        //                     position="relative"
        //                     type="button"
        //                     onClick={onOpen}
        //                     colorScheme="none"
        //                     color="gray.400"
        //                 >
        //                     <Icon as={RiShoppingCartLine} boxSize="25px" />
        //                     {cart.length > 0 && (
        //                         <Text
        //                             as="sup"
        //                             position="absolute"
        //                             right="5px"
        //                             d="flex"
        //                             justifyContent="center"
        //                             alignItems="center"
        //                             backgroundColor="red.500"
        //                             color="white"
        //                             h="20px"
        //                             w="20px"
        //                             borderRadius="50%"
        //                         >
        //                             {cart.length}
        //                         </Text>
        //                     )}
        //                 </Button> : null}
        //             </HStack>
        //         </HStack>
        //     </Box>
        // </Box>
    );
}
