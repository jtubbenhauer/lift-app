import React, { Dispatch, SetStateAction } from "react";
import {
  Button,
  Flex,
  Modal,
  Text,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Exercise, Set } from "../../prisma/prisma/client";
import { AddIcon } from "@chakra-ui/icons";
import { ExerciseState, ProgramState } from "../../types/propTypes";
import SetItem from "./SetItem";
import cuid from "cuid";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  exerciseState: ExerciseState;
  exerciseIndex: number;
  programState: ProgramState;
  setProgramState: Dispatch<SetStateAction<ProgramState>>;
  dayIndex: number;
}

function SetModal({
  isOpen,
  onOpen,
  onClose,
  exerciseState,
  exerciseIndex,
  programState,
  setProgramState,
  dayIndex,
}: Props) {
  const handleAddSet = () => {
    const newSet: Set = {
      id: cuid(),
      exerciseId: exerciseState.id,
      weight: 50,
      reps: 8,
    };
    const newProgram: ProgramState = JSON.parse(JSON.stringify(programState));

    newProgram.days[dayIndex].exercises[exerciseIndex].sets.push(newSet);

    setProgramState(newProgram);
    console.log(programState);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit {exerciseState.name} Sets</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Button leftIcon={<AddIcon />} onClick={handleAddSet}>
            Add Set
          </Button>
          {programState.days[dayIndex].exercises[exerciseIndex].sets.map(
            (set) => (
              <SetItem key={set.id} />
            )
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme={"green"} variant={"outline"}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SetModal;
