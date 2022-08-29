import { GetServerSideProps, NextPage } from "next";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { prisma } from "../../utils/prismaClient";
import { Day, Program } from "@prisma/client";
import { ParsedUrlQuery } from "querystring";
import { SyntheticEvent, useEffect, useState } from "react";
import Router from "next/router";
import DayCard from "../../components/program/DayCard";
import EditableField from "../../components/EditableField";

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface ProgramProps extends Program {
  days: Day[];
}

const ProgramPage: NextPage<ProgramProps> = ({ name, days, id }) => {
  const [title, setTitle] = useState(name);

  const handleDelete = async (e: SyntheticEvent) => {
    e.preventDefault();
    await fetch(`/api/program/${id}`, {
      method: "DELETE",
    }).then((res) => Router.push("/programs"));
  };

  return (
    <Flex justify={"center"} align={"center"}>
      <Flex direction={"column"} align={"center"} justify={"center"} w={"md"}>
        <EditableField title={title} setTitle={setTitle} />
        <Flex direction={"column"} gap={6}>
          {days.map((day, index) => (
            <DayCard key={index} day={day} numDay={index + 1} />
          ))}
        </Flex>
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
    include: { days: { include: { exercises: true } } },
  });

  return { props: { ...program } };
};

export default ProgramPage;
