import { GetServerSideProps, NextPage } from "next";
import { Box, Button, Flex, SimpleGrid, useToast } from "@chakra-ui/react";
import { prisma } from "../../utils/prismaClient";
import { Day } from "@prisma/client";
import { SyntheticEvent, useState } from "react";
import Router from "next/router";
import DayCard from "../../components/program/DayCard";
import EditableField from "../../components/EditableField";
import { ProgramState } from "../../types/propTypes";
import { IParams } from "../../types/paramTypes";

interface Props {
  program: ProgramState;
}

const ProgramPage: NextPage<Props> = ({ program }) => {
  const [programState, setProgramState] = useState(program);
  const toast = useToast();

  const handleDelete = async (e: SyntheticEvent) => {
    e.preventDefault();
    await fetch(`/api/program/${program?.id}`, {
      method: "DELETE",
    }).then((res) => Router.push("/programs"));
  };

  const handleTitleChange = (e: string) => {
    setProgramState((programState: any) => ({
      ...programState,
      name: e,
    }));
  };

  const handleSave = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch(`/api/program/${program?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(programState),
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
        <EditableField
          title={programState?.name || ""}
          onChange={handleTitleChange}
        />
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
        {programState.days.map((day, index) => (
          <DayCard
            key={day.id}
            day={day}
            index={index}
            programState={programState}
            setProgramState={setProgramState}
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

  return { props: { program } };
};

export default ProgramPage;
