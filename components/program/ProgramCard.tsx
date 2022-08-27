import React from "react";
import { Program } from "@prisma/client";
import { Flex } from "@chakra-ui/react";
import ChakraLink from "../ChakraLink";

interface Props {
  program: Program;
}

function ProgramCard({ program }: Props) {
  return (
    <Flex>
      <ChakraLink href={`/program/${program.id}`} label={program.name} />
    </Flex>
  );
}

export default ProgramCard;
