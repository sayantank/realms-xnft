import React, { useState } from "react";
import { View, Text, Button } from "react-xnft";
import { DropdownOption } from "../../../lib";
import { DropdownItem } from "./DropdownItem";

type DropdownProps<T> = {
  selectedOption: DropdownOption<T>;
  options: DropdownOption<T>[];
  onChange: (value: DropdownOption<T>) => void;
};
export function Dropdown<T>({
  selectedOption,
  options,
  onChange,
}: DropdownProps<T>) {
  const [showLists, setShowLists] = useState(false);

  return (
    <View style={{ width: "100%", position: "relative" }}>
      <Button
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#182541",
        }}
        onClick={() => setShowLists(!showLists)}
      >
        <Text style={{ fontSize: "0.9rem" }}>{selectedOption.label}</Text>
      </Button>
      <View
        style={{
          display: showLists ? "block" : "none",
          position: "absolute",
          top: "100%",
          marginTop: "0.5rem",
          height: "auto",
          maxHeight: "20rem",
          overflowY: "auto",
          width: "100%",
          backgroundColor: "#182541",
          borderRadius: "1rem",
        }}
      >
        {options.map((option, index) => (
          <DropdownItem
            key={option.label}
            option={option}
            onClick={() => {
              onChange(option);
              setShowLists(false);
            }}
          />
        ))}
      </View>
    </View>
  );
}
