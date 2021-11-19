import React, { useEffect, useState } from "react";
import { Box, Stack, Heading, SimpleGrid } from "@chakra-ui/react";

import Card from "../../components/card";
import { useProducts } from "../../contexts/products";
import { useAuth } from "../../contexts/auth";

import "./style.css";
import Banner from "../../components/banner";

const ListProducts: React.FC = () => {
  const { products, obterFavoritos } = useProducts();
  const { signed, user } = useAuth();
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    async function fetch() {
      if (signed) {

        const valores = await obterFavoritos(user.id);
        if (valores.length > 0)
          setFavoritos(valores);
        else 
          setFavoritos([]);
      }
    }
    fetch();
  }, [obterFavoritos, signed, user])


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
            Produtos
          </Heading>
          <SimpleGrid columns={4} spacing={10}>
            {products.map((item) => {
              return (
                <Card key={item.id} product={item} isFavorito={favoritos.length > 0 && favoritos.find((x: any) => x.idProduto == item.id) != null} />
              )
            })}
          </SimpleGrid>
        </Stack>
      </Box>
    </>
  );
};

export default ListProducts;
