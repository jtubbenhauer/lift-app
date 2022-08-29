import { GetServerSideProps, NextPage } from "next";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { prisma } from "../utils/prismaClient";
import ProgramCard from "../components/program/ProgramCard";
import type { Program } from "@prisma/client";

interface Props {
  programs: Program[];
}

const Programs: NextPage<Props> = ({ programs }) => {
  return (
    <Flex
      align={"center"}
      justify={"center"}
      p={12}
      direction={"column"}
      gap={12}
    >
      <Link href={"/program/new"}>
        <Button>New Program</Button>
      </Link>
      <Flex direction={"column"} gap={4}>
        {!programs.length && (
          <Text fontStyle={"italic"}>Add a program to get started!</Text>
        )}
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const programs = await prisma.program.findMany({
    where: { user: { email: session?.user?.email } },
  });

  return { props: { programs } };
};

export default Programs;
