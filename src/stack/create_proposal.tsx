import React, { useState } from "react";
import { View } from "react-xnft";
import { Dropdown } from "../components/common/Dropdown";
import LoadingScreen from "../components/common/LoadingScreen";
import { IRealm } from "../lib/interfaces/realm";
import { getInstructions } from "../utils/proposals";

export interface CreateProposalProps {
  realm?: IRealm;
}

export default function CreateProposal({ realm }: CreateProposalProps) {
  if (!realm) {
    return <LoadingScreen />;
  }

  const [instructions] = useState(getInstructions());

  const [selectedInstruction, setSelectedInstruction] = useState(
    instructions[0]
  );

  return (
    <View
      style={{ height: "100%", padding: "1rem", backgroundColor: "#111827" }}
    >
      <Dropdown
        selectedOption={selectedInstruction}
        options={instructions}
        onChange={(i) => setSelectedInstruction(i)}
      />
      <selectedInstruction.value.Form />
    </View>
  );
}
