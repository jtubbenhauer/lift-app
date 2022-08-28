import { GetServerSideProps, NextPage } from "next";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { prisma } from "../../utils/prismaClient";
import { Program, Day } from "@prisma/client";
import { ParsedUrlQuery } from "querystring";
import { SyntheticEvent, useState } from "react";
import Router from "next/router";
import DayCard from "../../components/program/DayCard";

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface Props {
  program: Program;
  days: Array<Day>;
}

const Program: NextPage<Props> = ({ program, days }) => {
  const handleDelete = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch(`/api/program/${program.id}`, {
      method: "DELETE",
    }).then((res) => Router.push("/programs"));
  };

  return (
    <Flex justify={"center"} align={"center"}>
      <Flex direction={"column"} align={"center"} justify={"center"} w={"md"}>
        <Heading>{program.name}</Heading>
        {days.map((day, index) => (
          <DayCard key={index} day={day} numDay={index + 1} />
        ))}
        <Flex gap={4} m={4}>
          <Button colorScheme={"green"}>Save Program</Button>
          <Button colorScheme={"red"} onClick={(e) => handleDelete(e)}>
            Delete
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as IParams;

  const program = await prisma.program.findUnique({
    where: { id: id },
  });

  const days = await prisma.day.findMany({
    where: { programId: id },
  });
  return { props: { program, days } };
};

export default Program;
