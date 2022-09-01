import React, { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { Day } from "@prisma/client";
import { Box, Button, Fade, Flex, Text } from "@chakra-ui/react";
import EditableField from "../EditableField";
import ExerciseCard from "./ExerciseCard";
import { ProgramState } from "../../types/propTypes";
import cuid from "cuid";
import { AddIcon, PlusSquareIcon } from "@chakra-ui/icons";

interface Props {
  dayIndex: number;
  day: Day;
  programState: ProgramState;
  setProgramState: Dispatch<SetStateAction<ProgramState>>;
}

function DayCard({ dayIndex, programState, setProgramState, day }: Props) {
  const handleTitleChange = (e: string) => {
    const newDays = programState.days.map((item: Day) => {
      if (item.id === day.id) {
        return { ...item, name: e };
      }
      return item;
    });

    setProgramState((programState: any) => ({
      ...programState,
      days: newDays,
    }));
  };

  const handleAddExercise = async () => {
    const newExercise = {
      id: cuid(),
      name: "Untitled Exercise",
      dayId: programState.days[dayIndex].id,
    };

    const newDays = programState.days.map((day) => {
      return day;
    });

    newDays[dayIndex].exercises.push(newExercise);

    setProgramState((programState) => ({
      ...programState,
      days: newDays,
    }));
  };

  const handleRemoveDay = async (e: SyntheticEvent) => {
    e.preventDefault();

    setProgramState((programState) => ({
      ...programState,
      days: programState.days.filter((d) => d.id !== day.id),
    }));
    await fetch(`/api/day/${day.id}`, {
      method: "DELETE",
    });
  };

  return (
    <Fade in>
      <Flex
        direction={"column"}
        bgColor={"gray.700"}
        rounded={"lg"}
        boxShadow={"lg"}
        align={"center"}
        justify={"space-between"}
        gap={6}
        p={6}
        position={"relative"}
        overflow={"hidden"}
        minH={250}
        h={"100%"}
      >
        <Box
          position={"absolute"}
          right={-10}
          top={-140}
          opacity={"0.04"}
          zIndex={0}
        >
          <Text fontSize={"20rem"} userSelect={"none"} fontWeight={"bold"}>
            {dayIndex + 1}
          </Text>
        </Box>

        <Flex align={"center"} justify={"space-between"} w={"full"} zIndex={10}>
          <EditableField
            title={programState.days[dayIndex].name}
            onChange={handleTitleChange}
          />
          <Button
            colorScheme={"purple"}
            onClick={handleAddExercise}
            variant={"outline"}
            leftIcon={<AddIcon />}
          >
            Add Exercise
          </Button>
        </Flex>
        {programState.days[dayIndex].exercises.map((exercise, index) => (
          <ExerciseCard
            exercise={exercise}
            key={exercise.id}
            index={index}
            programState={programState}
            setProgramState={setProgramState}
            dayIndex={dayIndex}
          />
        ))}
        <Button
          variant={"outline"}
          colorScheme={"red"}
          onClick={handleRemoveDay}
          zIndex={10}
        >
          Remove Day
        </Button>
      </Flex>
    </Fade>
  );
}

export default DayCard;
