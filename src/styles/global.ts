import { createGlobalStyle } from "styled-components";
import { background, theme } from "@chakra-ui/react";

export default createGlobalStyle`

  * {
    flex-wrap: wrap;
    box-sizing: border-box;
    
  }


  main {
    margin: 30px auto 30px;
    width: 90%;
    max-width: 1980px;
  }

  .active {
    color: ${theme.colors.blue["500"]};
    font-weight: bold;
    border-bottom: 5px solid ${theme.colors.blue["500"]}
  }`;

