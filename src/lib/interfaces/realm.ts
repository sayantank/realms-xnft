import {
  Governance,
  MintMaxVoteWeightSource,
  ProgramAccount,
  Proposal,
  Realm,
} from "@solana/spl-governance";
import { Connection, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { InstructionSet, MintMeta } from "../types";
import { Asset, AssetType } from "./asset";

export interface IRealm {
  id: string;
  imageUrl?: string;
  name: string;
  programId: PublicKey;
  programVersion: number;
  account: ProgramAccount<Realm>;
  communityMint: MintMeta;
  councilMint?: MintMeta;
  authority?: PublicKey;
  votingProposalCount: number;
  communityMintMaxVoteWeightSource: MintMaxVoteWeightSource;
  minVoteWeightToCreateGovernance: BN;
  governances: ProgramAccount<Governance>[];
  proposals: ProgramAccount<Proposal>[];
  assets: Asset[];

  canCreateProposal(
    owner: PublicKey,
    governance: ProgramAccount<Governance>
  ): boolean;

  getDepositCommunityTokenInstructions(
    connection: Connection,
    amount: BN,
    owner: PublicKey
  ): Promise<InstructionSet>;
}
