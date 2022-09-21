import { Governance, ProgramAccount } from "@solana/spl-governance";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import BN from "bn.js";

export type MintMeta = {
  address: PublicKey;
  decimals: number;
  mintAuthority: PublicKey | null;
  freezeAuthority: PublicKey | null;
  name?: string;
  symbol?: string;
};

export type InstructionSet = {
  instructions: TransactionInstruction[];
  preInstructions: TransactionInstruction[];
  postInstructions: TransactionInstruction[];
};

export type NativeTreasury = {
  address: PublicKey;
  lamports: BN;
  governance: ProgramAccount<Governance>;
  programId: PublicKey;
};

export type DropdownOption<T> = {
  label: string;
  value: T;
};
