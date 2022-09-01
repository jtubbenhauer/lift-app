import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  global,
  colors: {
    red: {
      50: "#ffe5e5",
      100: "#fab5b5",
      200: "#f98483",
      300: "#f95451",
      400: "#f92c21",
      500: "#e11d0b",
      600: "#ae1407",
      700: "#7c0d06",
      800: "#4a0503",
      900: "#1a0000",
    },
  },
});
