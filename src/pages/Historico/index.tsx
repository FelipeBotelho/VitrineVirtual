import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Heading, IconButton, list, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth";
import { useProducts } from "../../contexts/products";
import { ProductModel } from "../../types/products";
import { currencyFormatter } from "../../utils/formatter";
import { RiReplyAllFill } from "react-icons/ri";
import { useCart } from "../../contexts/cart";
import Banner from "../../components/banner";

function Historico() {
    const { obterUltimasCompras, obterProdutosPorListaId, products } = useProducts();
    const { user } = useAuth();
    const { handleAddListCart, cart } = useCart();
    const [produtos, setProducts] = useState<ProductModel[]>([]);
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        async function fetch() {
            debugger;
            const comp = await obterUltimasCompras(user.id);
            setCompras(comp);

            const idsProdutos = new Set();
            comp.forEach((el: any) => {
                el.compra.forEach((prod: any) => {
                    idsProdutos.add(prod.idProduto);
                });
            });
            const prds = await obterProdutosPorListaId(Array.from(idsProdutos));
            setProducts(prds);
        }
        fetch();
    }, [obterProdutosPorListaId, obterUltimasCompras, user])

    const handleBuyAgain = (item: any) => {
        debugger;
        const listId: number[] = [];
        item.compra.forEach((element: any) => {
            listId.push(element.idProduto);
        });
        handleAddListCart(listId);
    }

    return (
        <>
            <Banner />
            <div className="row" style={{ margin: "15px" }}>
                <div className="col col-12">
                    <Heading
                        as="h3"
                        borderBottom="5px solid"
                        borderColor="blue.600"
                        p="0 10px"
                        w="fit-content"
                    >
                        Ultimas Compras
                    </Heading>
                    <br/>
                    <Table variant="simple" style={{ background: "#fff" }}>
                        <Thead>
                            <Tr>
                                <Th>Data da Compra</Th>
                                <Th>Produtos Comprados</Th>
                                <Th>Valor Total</Th>
                                <Th>Ação</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {compras.sort(function (a: any, b: any) {
                                return a.id > b.id ? -1 : a.id < b.id ? 1 : 0;
                            }).map((item: any) => (
                                <Tr key={item.id}>
                                    <Td>{item.dataCompra}</Td>
                                    <Td>{item.compra.map((prod: any) => {

                                        return (
                                            <div key={`${prod.idProduto}${prod.quantidade}`} >{produtos.find((x: any) => x.id == prod.idProduto)?.nome} x {prod.quantidade}</div>
                                        )

                                    })}</Td>
                                    <Td >{currencyFormatter(item.total)}</Td>
                                    <Td>
                                        <IconButton
                                            style={{ marginRight: "5px" }}
                                            colorScheme="green"
                                            size="sm"
                                            aria-label="Comprar Novamente"
                                            icon={<RiReplyAllFill />}
                                            onClick={() => handleBuyAgain(item)}
                                        />

                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>

                </div>
            </div>
        </>

    );
}

export default Historico;