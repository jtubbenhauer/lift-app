import React, { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { Button, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { Exercise } from "@prisma/client";
import { ProgramState } from "../../types/propTypes";
import EditableField from "../EditableField";
import { CloseIcon } from "@chakra-ui/icons";
import SetModal from "./SetModal";

interface Props {
  exercise: Exercise;
  exerciseIndex: number;
  programState: ProgramState;
  setProgramState: Dispatch<SetStateAction<ProgramState>>;
  dayIndex: number;
}

function ExerciseCard({
  exercise,
  exerciseIndex,
  programState,
  setProgramState,
  dayIndex,
}: Props) {
  const exerciseState = programState.days[dayIndex].exercises[exerciseIndex];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleTitleChange = (e: string) => {
    const newProgram: ProgramState = JSON.parse(JSON.stringify(programState));

    newProgram.days[dayIndex].exercises[exerciseIndex].name = e;

    setProgramState(newProgram);
  };

  const handleDeleteExercise = async (e: SyntheticEvent) => {
    e.preventDefault();

    const newProgram: ProgramState = JSON.parse(JSON.stringify(programState));

    newProgram.days[dayIndex].exercises.splice(exerciseIndex, 1);
    setProgramState(newProgram);

    await fetch(`/api/exercise/${exercise.id}`, { method: "DELETE" });
  };

  return (
    <Flex direction={"column"} w={"100%"} p={"0 1rem"} align={"center"}>
      <SetModal
        isOpen={isOpen}
        onClose={onClose}
        exerciseState={exerciseState}
        exerciseIndex={exerciseIndex}
        programState={programState}
        dayIndex={dayIndex}
        setProgramState={setProgramState}
      />
      <Flex gap={10} align={"center"} justify={"space-between"} w={"100%"}>
        <EditableField
          title={exerciseState.name}
          onChange={handleTitleChange}
          fontSize={"lg"}
        />
        <Flex gap={4}>
          <Button variant={"outline"} size={"sm"} onClick={onOpen}>
            Edit Sets
          </Button>
          <IconButton
            colorScheme={"red"}
            aria-label={"delete-icon"}
            icon={<CloseIcon />}
            variant={"outline"}
            size={"sm"}
            onClick={handleDeleteExercise}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ExerciseCard;
