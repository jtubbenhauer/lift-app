import { Flex, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { NavItem } from "./Navbar";
import Link from "next/link";

interface Props {
  items: Array<NavItem>;
  onToggle: () => void;
}

const MobileNav = ({ items, onToggle }: Props) => {
  return (
    <Stack borderBottom={1} borderStyle={"solid"} borderColor="purple.800">
      {items.map((i) => (
        <Link key={i.label} href={i.href} passHref>
          <ChakraLink onClick={onToggle}>
            <Text fontWeight={600} fontSize={"lg"} p={4} align={"center"}>
              {i.label}
            </Text>
          </ChakraLink>
        </Link>
      ))}
    </Stack>
  );
};

export default MobileNav;
