
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    gray: {
      "300": "#f0deda",
      "400": "#8D8D8D",
      "500": "#282828",
    },
    red: {
      "500": "rgb(190, 36, 37)",
    },
    green: {
      "500": "#00919b",
    },
    blue: {
      "400": "rgb(40, 180, 230)",
      "500": "#4ba1e0",
      "600": "#005fb9",
    },
  },

  fontSizes: {
    xxs: "0.75rem",
    xs: "0.8125rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.25rem",
    lgg: "1.5rem",
    xl: "1.875rem",
    xxl: "2.25rem",
  },

  space: {
    sm: "5px",
    md: "15px",
  },

  styles: {
    global: {
      body: {
        bg: "#473c381c",
      },

      label: {
        fontSize: "sm",
      },
    },
  },
});
