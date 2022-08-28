import { GetServerSideProps, NextPage } from "next";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Text,
} from "@chakra-ui/react";
import { prisma } from "../../utils/prismaClient";
import { Program } from "@prisma/client";
import { ParsedUrlQuery } from "querystring";
import { SyntheticEvent, useState } from "react";
import Router from "next/router";
import DayCard from "../../components/program/DayCard";

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface Props {
  program: Program;
}

const Program: NextPage<Props> = ({ program }) => {
  const [numDays, setNumDays] = useState<number>(program.numDays);

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
        <FormControl>
          <FormLabel>Days per week</FormLabel>
          <Select
            value={numDays}
            onChange={(e) => setNumDays(parseInt(e.target.value))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </Select>
        </FormControl>
        {[...Array(numDays)].map((day) => (
          <DayCard key={day} day={day} />
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
  return { props: { program } };
};

export default Program;
