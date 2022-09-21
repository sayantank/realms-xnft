import React from "react";
import { Button, Text } from "react-xnft";
import { DropdownOption } from "../../../lib";

type DropdownItemProps<T> = {
  option: DropdownOption<T>;
  onClick: () => void;
};
export function DropdownItem<T>({ option, onClick }: DropdownItemProps<T>) {
  return (
    <Button
      style={{ width: "100%", padding: "0.6rem", backgroundColor: "#182541" }}
      onClick={onClick}
    >
      <Text style={{ fontSize: "0.9rem" }}>{option.label}</Text>
    </Button>
  );
}
