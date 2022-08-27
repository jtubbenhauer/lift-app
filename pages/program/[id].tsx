import { GetServerSideProps, NextPage } from "next";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { prisma } from "../../utils/prismaClient";
import { Program } from "@prisma/client";
import { ParsedUrlQuery } from "querystring";
import { SyntheticEvent } from "react";
import Router from "next/router";

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface Props {
  program: Program;
}

const Program: NextPage<Props> = ({ program }) => {
  const handleDelete = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch(`/api/program/${program.id}`, {
      method: "DELETE",
    }).then((res) => Router.push("/programs"));
  };

  return (
    <Flex direction={"column"} align={"center"} justify={"center"}>
      <Heading>{program.name}</Heading>
      <Button colorScheme={"red"} onClick={(e) => handleDelete(e)}>
        Delete
      </Button>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as IParams;

  const program = await prisma.program.findUnique({
    where: { id: id },
  });
  return { props: { program } };
};

export default Program;
