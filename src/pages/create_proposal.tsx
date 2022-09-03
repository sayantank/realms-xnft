import { ProgramAccount, Realm } from "@solana/spl-governance";
import React from "react";
import { View } from "react-xnft";

export interface CreateProposalProps {
  realm?: ProgramAccount<Realm>;
}

export default function CreateProposal({ realm }: CreateProposalProps) {
  return <View>{JSON.stringify(realm)}</View>;
}
