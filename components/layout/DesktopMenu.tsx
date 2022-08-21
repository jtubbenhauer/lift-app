import React from "react";
import { NavItem } from "./Navbar";
import { Link as ChakraLink, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";

interface Props {
  items: Array<NavItem>;
}

function DesktopMenu({ items }: Props) {
  return (
    <HStack spacing={5}>
      {items.map((i) => (
        <Link key={i.label} href={i.href} passHref>
          <ChakraLink>
            <Text fontWeight={600} fontSize={"xl"}>
              {i.label}
            </Text>
          </ChakraLink>
        </Link>
      ))}
    </HStack>
  );
}

export default DesktopMenu;
