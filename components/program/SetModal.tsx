import React, { Dispatch, SetStateAction, SyntheticEvent } from "react";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Set } from "../../prisma/prisma/client";
import { AddIcon } from "@chakra-ui/icons";
import { ExerciseState, ProgramState } from "../../types/propTypes";
import SetItem from "./SetItem";
import cuid from "cuid";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  exerciseState: ExerciseState;
  exerciseIndex: number;
  programState: ProgramState;
  setProgramState: Dispatch<SetStateAction<ProgramState>>;
  dayIndex: number;
}

function SetModal({
  isOpen,
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
  };

  const handleSave = async (e: SyntheticEvent) => {
    e.preventDefault();
    onClose();
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

          <Flex direction={"column"} mt={6} gap={6}>
            {programState.days[dayIndex].exercises[exerciseIndex].sets.map(
              (set, index) => (
                <SetItem
                  key={set.id}
                  set={set}
                  setIndex={index}
                  dayIndex={dayIndex}
                  exerciseIndex={exerciseIndex}
                  programState={programState}
                  setProgramState={setProgramState}
                />
              )
            )}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme={"green"}
            variant={"outline"}
            onClick={handleSave}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SetModal;
