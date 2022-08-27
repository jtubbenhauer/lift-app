import React from "react";
import Link from "next/link";
import { Link as ChakLink } from "@chakra-ui/react";

interface Props {
  href: string;
  label: string;
}

function ChakraLink({ href, label }: Props) {
  return (
    <Link href={href} passHref>
      <ChakLink>{label}</ChakLink>
    </Link>
  );
}

export default ChakraLink;
