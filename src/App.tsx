import React from 'react';
import Routes from './routes';
import { theme } from "./styles/theme";

import { AuthProvider } from './contexts/auth';
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalStyle from "./styles/global";

import Menu from './components/menu';
import { ChakraProvider } from '@chakra-ui/react';
import { ProductsProvider } from './contexts/products';
import { CartProvider } from './contexts/cart';
import { BrowserRouter } from 'react-router-dom';
import Cart from './components/cart';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <BrowserRouter>
              <GlobalStyle />
              <Menu />
              <Cart />
              <Routes />
            </BrowserRouter>
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
