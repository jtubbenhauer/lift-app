import React, {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import { Flex, IconButton, Select } from "@chakra-ui/react";
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
    console.log(e);
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
    <Flex direction={"column"} gap={4}>
      <Flex gap={10} align={"center"}>
        <EditableField
          title={exerciseState.name}
          onChange={handleTitleChange}
        />
        <IconButton
          colorScheme={"red"}
          aria-label={"delete-icon"}
          icon={<CloseIcon />}
          variant={"outline"}
          size={"sm"}
          onClick={handleDeleteExercise}
        />
      </Flex>
      <Select
        placeholder={"# of Sets"}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setNumSets(parseInt(e.target.value))
        }
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </Select>
    </Flex>
  );
}

export default ExerciseCard;
