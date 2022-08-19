import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import MobileMenu from "./MobileMenu";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <Flex direction="column" h="100vh">
      <Box as="main">{children}</Box>
      <Spacer />
      <MobileMenu />
    </Flex>
  );
}

export default Layout;
