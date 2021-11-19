import { Box, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Banner from "../../components/banner";
import Card from "../../components/card";
import { useAuth } from "../../contexts/auth";
import { useProducts } from "../../contexts/products";

function Favoritos(){
    const { obterFavoritos, obterProdutosPorListaId } = useProducts();
    const {user} = useAuth();
    const [products, setProducts] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    useEffect(() => {
        async function fetch() {
            const favoritos = await obterFavoritos(user.id);
            setFavoritos(favoritos);
            if(favoritos.length > 0){
                const idsProdutos = favoritos.map((x:any)=>x.idProduto);
                const produtos = await obterProdutosPorListaId(idsProdutos)
                setProducts(produtos);
            }else{
                setProducts([]);
            }
        }
        fetch();      
    },[obterFavoritos, obterProdutosPorListaId, user])
    return (
        <>
        <Banner/>
        <Box as="main">
          <Stack spacing="md">
            <Heading
              as="h3"
              textTransform="uppercase"
              borderBottom="5px solid"
              borderColor="blue.600"
              p="0 10px"
              w="fit-content"
            >
              Favoritos
            </Heading>
            <SimpleGrid columns={4} spacing={10}>
              {products.map((item: any) => {
                return (
                  <Card key={item.id} product={item} isFavorito={favoritos.length > 0 && favoritos.find((x: any) => x.idProduto == item.id) != null} />
                )
              })}
              {products.length == 0 &&
                <h2>Não há favoritos</h2>
              }
            </SimpleGrid>
          </Stack>
        </Box>
      </>
    )
}
export default Favoritos;