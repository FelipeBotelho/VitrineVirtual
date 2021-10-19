import React from "react";
import { Box, Stack, Heading, SimpleGrid } from "@chakra-ui/react";

import Card from "../../components/card";
import { useProducts } from "../../contexts/products";

const ListProducts: React.FC = () => {
  const { products } = useProducts();

  return (
    <Box as="main">
      <Stack spacing="md">
        <Heading
          as="h1"
          textTransform="uppercase"
          borderBottom="5px solid"
          borderColor="blue.600"
          p="0 10px"
          w="fit-content"
        >
          Queijos
        </Heading>
        <SimpleGrid columns={4} spacing={10}>
          {products.map((item) => (
            <Card key={item.id} product={item} />
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default ListProducts;
