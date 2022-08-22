import { NextPage } from "next";
import { Flex, Heading } from "@chakra-ui/react";
import NewProgramForm from "../../components/program/newProgramForm";
import Router from "next/router";

export interface programProps {
  programName: string;
  numDays: number | null;
  isActive: boolean;
}

const NewProgram: NextPage = () => {
  const createProgram = async ({
    programName,
    numDays,
    isActive,
  }: programProps) => {
    const body = { programName, numDays, isActive };
    await fetch(`/api/program/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) =>
      res.json().then((data) => Router.push(`/program/${data.result.id}`))
    );
  };

  return (
    <Flex flexDirection={"column"} align={"center"}>
      <Heading pt={5}>New Program</Heading>
      <NewProgramForm createProgram={createProgram} />
    </Flex>
  );
};

export default NewProgram;
