import React, { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { Day } from "@prisma/client";
import { Box, Button, Fade, Flex, IconButton, Text } from "@chakra-ui/react";
import EditableField from "../EditableField";
import ExerciseCard from "./ExerciseCard";
import { ExerciseState, ProgramState } from "../../types/propTypes";
import cuid from "cuid";
import { AddIcon, CloseIcon, PlusSquareIcon } from "@chakra-ui/icons";

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
    const newExercise: ExerciseState = {
      id: cuid(),
      name: "Untitled Exercise",
      dayId: programState.days[dayIndex].id,
      sets: [],
    };

    const newProgram: ProgramState = JSON.parse(JSON.stringify(programState));

    newProgram.days[dayIndex].exercises.push(newExercise);

    setProgramState(newProgram);
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
        gap={6}
        p={4}
        position={"relative"}
        overflow={"hidden"}
        minH={290}
        h={"100%"}
      >
        <Flex
          align={"center"}
          justify={"space-between"}
          w={"full"}
          zIndex={10}
          p={"0 1rem"}
          direction={{ base: "column", md: "row" }}
          _before={{
            content: '""',
            bgColor: "gray.800",
            opacity: 0.5,
            position: "absolute",
            width: "100%",
            top: 0,
            left: 0,
            height: { base: "110px", md: "70px" },
            zIndex: 0,
          }}
        >
          <Box zIndex={20}>
            <EditableField
              title={programState.days[dayIndex].name}
              onChange={handleTitleChange}
            />
          </Box>
          <Flex gap={4} align={"center"}>
            <Button
              colorScheme={"purple"}
              onClick={handleAddExercise}
              variant={"outline"}
              size={"sm"}
              mt={{ base: 3, md: 0 }}
              leftIcon={<AddIcon />}
              zIndex={20}
            >
              Add Exercise
            </Button>
            <IconButton
              aria-label={"close-icon"}
              icon={<CloseIcon />}
              size="sm"
              colorScheme={"red"}
              variant={"outline"}
              onClick={handleRemoveDay}
            />
          </Flex>
        </Flex>

        <Flex
          grow={1}
          direction={"column"}
          w={"100%"}
          gap={4}
          mt={4}
          justify={"start"}
        >
          {programState.days[dayIndex].exercises.map((exercise, index) => (
            <ExerciseCard
              exercise={exercise}
              key={exercise.id}
              exerciseIndex={index}
              programState={programState}
              setProgramState={setProgramState}
              dayIndex={dayIndex}
            />
          ))}
        </Flex>
      </Flex>
    </Fade>
  );
}

export default DayCard;
