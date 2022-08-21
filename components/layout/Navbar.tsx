import React from "react";
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import Logo from "./Logo";
import { signIn, signOut, useSession } from "next-auth/react";
import MobileNav from "./MobileNav";
import DesktopMenu from "./DesktopMenu";

export interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    href: "/",
  },
  { label: "Lift", href: "lift" },
  {
    label: "Programs",
    href: "/programs",
  },
];

function Navbar() {
  const { data: session } = useSession();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        as={"nav"}
        justify={"space-between"}
        align={"center"}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"purple.800"}
        minH={"70px"}
      >
        <Box display={{ base: "block", md: "none" }} flex={1}>
          <IconButton
            colorScheme={"purple"}
            pl={3}
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={5} h={5} /> : <HamburgerIcon w={8} h={8} />
            }
            aria-label={"Toggle Navigation"}
            variant={"ghost"}
          />
        </Box>
        <Flex flex={[1, 1, 0]} pl={{ md: "2rem" }} justify={"center"}>
          <Logo fontSize={36} />
        </Flex>

        <Flex flex={1} justify={"end"}>
          <Flex display={{ base: "none", md: "flex" }} align={"center"}>
            <DesktopMenu items={NAV_ITEMS} />
          </Flex>
          {session ? (
            <Button
              colorScheme={"purple"}
              variant={"ghost"}
              fontSize={"lg"}
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              colorScheme={"purple"}
              variant={"ghost"}
              fontSize={"lg"}
              onClick={() => signIn()}
            >
              Sign In
            </Button>
          )}
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav items={NAV_ITEMS} onToggle={onToggle} />
      </Collapse>
    </Box>
  );
}

export default Navbar;
