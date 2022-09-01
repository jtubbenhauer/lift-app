import React, {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import { Button, Flex, IconButton, Select } from "@chakra-ui/react";
import { Exercise } from "@prisma/client";
import { ProgramState } from "../../types/propTypes";
import EditableField from "../EditableField";
import { CloseIcon } from "@chakra-ui/icons";

interface Props {
  exercise: Exercise;
  index: number;
  programState: ProgramState;
  setProgramState: Dispatch<SetStateAction<ProgramState>>;
  dayIndex: number;
}

function ExerciseCard({
  exercise,
  index,
  programState,
  setProgramState,
  dayIndex,
}: Props) {
  const exerciseState = programState.days[dayIndex].exercises[index];
  const [numSets, setNumSets] = useState(0);

  const handleTitleChange = (e: string) => {
    setProgramState((programState) => ({
      ...programState,
      days: [...programState.days].map((day) => {
        // If we're at the right day
        if (day.id == programState.days[dayIndex].id) {
          day.exercises[index].name = e;
          return day;
        } else {
          return day;
        }
      }),
    }));
  };

  const handleDeleteExercise = async (e: SyntheticEvent) => {
    e.preventDefault();

    setProgramState((programState) => ({
      ...programState,
      days: [...programState.days].map((day) => {
        if (day.id == exercise.dayId) {
          return {
            ...day,
            exercises: [...day.exercises].filter(
              (item) => item.id !== exercise.id
            ),
          };
        } else {
          return day;
        }
      }),
    }));
    await fetch(`/api/exercise/${exercise.id}`, { method: "DELETE" });
  };

  return (
    <Flex direction={"column"} w={"100%"} p={"0 1rem"} align={"center"}>
      <Flex gap={10} align={"center"} justify={"space-between"} w={"100%"}>
        <EditableField
          title={exerciseState.name}
          onChange={handleTitleChange}
          fontSize={"lg"}
        />
        <Flex gap={4}>
          <Button variant={"outline"} colorScheme={"green"} size={"sm"}>
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
