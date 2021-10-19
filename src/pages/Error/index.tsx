import React from "react";
import { Box, Stack, Heading, Text } from "@chakra-ui/react";

const ErrorPage: React.FC = () => {
  return (
    <Box
      as="main"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      margin={0}
      padding={0}
      backgroundColor="blue.500"
      color="white"
      width="100%"
      height="100vh"
    >
      <Stack spacing="md" textAlign="center">
        <Text fontSize="lg">Ops!</Text>
        <Heading as="h1" size="4xl">
          404
        </Heading>
        <Text fontSize="lg">Página não encontrada!</Text>
      </Stack>
    </Box>
  );
};

export default ErrorPage;
