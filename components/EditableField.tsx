import React, { SyntheticEvent } from "react";
import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  useEditableControls,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

interface Props {
  title: string | null | undefined;
  onChange: (e: string) => void;
  fontSize?: string;
}

function EditableField({ title, onChange, fontSize }: Props) {
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          aria-label={"submit-icon"}
          icon={<CheckIcon />}
          variant={"outline"}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label={"close-icon"}
          icon={<CloseIcon />}
          variant={"outline"}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          aria-label={"edit-icon"}
          size="sm"
          icon={<EditIcon />}
          variant={"outline"}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }

  return (
    <Editable
      textAlign="center"
      defaultValue={title || ""}
      fontSize={fontSize || "xl"}
      isPreviewFocusable={false}
      onChange={(e) => onChange(e)}
    >
      <Flex gap={4} align={"center"} justify={"center"}>
        <EditablePreview />
        <Input as={EditableInput} />
        <EditableControls />
      </Flex>
    </Editable>
  );
}

export default EditableField;
