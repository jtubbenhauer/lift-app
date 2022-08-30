import { GetServerSideProps, NextPage } from "next";
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
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

const ProgramPage: NextPage<ProgramProps> = (program) => {
  const [title, setTitle] = useState(program.name);
  const [dayData, setDayData] = useState(program.days);
  const toast = useToast();

  const handleDelete = async (e: SyntheticEvent) => {
    e.preventDefault();
    await fetch(`/api/program/${program.id}`, {
      method: "DELETE",
    }).then((res) => Router.push("/programs"));
  };

  const handleSave = async (e: SyntheticEvent) => {
    e.preventDefault();

    const body = { program: { ...program, name: title }, days: dayData };

    await fetch(`/api/program/${program.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(() =>
      toast({
        title: "Program saved",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      })
    );
  };

  return (
    <Box maxW={"1200px"} m={"0 auto"}>
      <Flex m={4} justify={"space-between"} align={"center"}>
        <EditableField title={title} onChange={setTitle} />
        <Flex gap={4} m={4} align={"center"} justify={"center"}>
          <Button colorScheme={"green"} onClick={(e) => handleSave(e)}>
            Save Program
          </Button>
          <Button colorScheme={"red"} onClick={(e) => handleDelete(e)}>
            Delete
          </Button>
        </Flex>
      </Flex>
      <SimpleGrid spacing={10} columns={{ base: 1, md: 2 }} p={4}>
        {program.days.map((day, index) => (
          <DayCard
            key={index}
            day={day}
            index={index}
            setDayData={setDayData}
            dayData={dayData}
          />
        ))}
      </SimpleGrid>
    </Box>
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
