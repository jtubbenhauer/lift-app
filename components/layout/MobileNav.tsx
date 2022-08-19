import { Link as ChakraLink, Stack } from "@chakra-ui/react";
import React from "react";
import { NavItem } from "./Navbar";
import Link from "next/link";

interface Props {
  items: Array<NavItem>;
  onToggle: () => void;
}

const MobileNav = ({ items, onToggle }: Props) => {
  return (
    <Stack>
      {items.map((i) => (
        <Link key={i.label} href={i.href} passHref>
          <ChakraLink onClick={onToggle}>{i.label}</ChakraLink>
        </Link>
      ))}
    </Stack>
  );
};

export default MobileNav;
