import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <Box as="main">{children}</Box>
    </>
  );
}

export default Layout;
