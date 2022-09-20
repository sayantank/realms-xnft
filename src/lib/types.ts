import { PublicKey, TransactionInstruction } from "@solana/web3.js";

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
