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
}

function SetItem({ set, setIndex, programState, setProgramState }: Props) {
  const handleDeleteSet = (e: SyntheticEvent) => {
    e.preventDefault();

    const newProgram = JSON.parse(JSON.stringify(programState));

    // Delete item from copy
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
