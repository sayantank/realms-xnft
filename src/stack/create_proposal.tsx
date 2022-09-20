import { ProgramAccount, Realm } from "@solana/spl-governance";
import React from "react";
import { View } from "react-xnft";
import LoadingScreen from "../components/common/LoadingScreen";
import { CreateATAInstruction } from "../lib/instructions/CreateATA";
import { IRealm } from "../lib/interfaces/realm";

export interface CreateProposalProps {
  realm?: IRealm;
}

export default function CreateProposal({ realm }: CreateProposalProps) {
  if (!realm) {
    return <LoadingScreen />;
  }

  const createATA = new CreateATAInstruction();

  return (
    <View
      style={{ height: "100%", padding: "1rem", backgroundColor: "#111827" }}
    >
      <createATA.Component title="hello world" />
    </View>
  );
}
