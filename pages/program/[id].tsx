import { GetServerSideProps, NextPage } from "next";
import { Box } from "@chakra-ui/react";
import { prisma } from "../../utils/prismaClient";
import { Program } from "@prisma/client";
import { ParsedUrlQuery } from "querystring";

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface Props {
  program: Program;
}

const Program: NextPage<Props> = ({ program }) => {
  console.log(program);

  return <Box>{program.name}</Box>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as IParams;

  const program = await prisma.program.findUnique({
    where: { id: id },
  });
  return { props: { program } };
};

export default Program;
