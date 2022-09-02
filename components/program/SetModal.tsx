import React from "react";
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

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function SetModal({ isOpen, onOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
            atque corporis facere incidunt nihil provident quia quod rerum, sed.
            Fuga. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Deserunt dolorum ducimus illum neque nesciunt obcaecati odio
            officiis quam quas quidem, repudiandae temporibus veniam voluptas.
            Aspernatur consectetur, consequuntur cupiditate dicta dolorem eos et
            impedit ipsum nesciunt, omnis pariatur porro ratione saepe.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SetModal;
