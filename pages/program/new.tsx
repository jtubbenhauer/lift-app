import { NextPage } from "next";
import { Flex, Heading } from "@chakra-ui/react";
import NewProgramForm from "./newProgramForm";

const NewProgram: NextPage = () => {
  return (
    <Flex flexDirection={"column"} align={"center"}>
      <Heading pt={5}>New Program</Heading>
      <NewProgramForm />
    </Flex>
  );
};

export default NewProgram;
