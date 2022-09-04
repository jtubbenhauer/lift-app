import React, { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { Set } from "../../prisma/prisma/client";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { ProgramState } from "../../types/propTypes";

interface Props {
  set: Set;
  setIndex: number;
  programState: ProgramState;
  setProgramState: Dispatch<SetStateAction<ProgramState>>;
  dayIndex: number;
  exerciseIndex: number;
}

function SetItem({
  set,
  setIndex,
  programState,
  setProgramState,
  dayIndex,
  exerciseIndex,
}: Props) {
  const handleDeleteSet = async (e: SyntheticEvent) => {
    e.preventDefault();

    const newProgram: ProgramState = JSON.parse(JSON.stringify(programState));

    newProgram.days[dayIndex].exercises[exerciseIndex].sets.splice(setIndex, 1);

    setProgramState(newProgram);

    await fetch(`/api/set/${set.id}`, { method: "DELETE" });
  };

  return (
    <Flex align={"center"} justify={"space-between"}>
      <Text>Set {setIndex + 1}</Text>

      <IconButton
        colorScheme={"red"}
        variant={"outline"}
        size={"sm"}
        aria-label={"close-icon"}
        icon={<CloseIcon />}
        onClick={handleDeleteSet}
      />
    </Flex>
  );
}

export default SetItem;
