import { Governance, ProgramAccount } from "@solana/spl-governance";
import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";

export enum AssetType {
  Mint = "mint",
  Program = "program",
  TokenAccount = "tokenAccount",
}

interface BaseAssetType {
  address: PublicKey;
  governance: ProgramAccount<Governance>;
  type: AssetType;
}

export interface MintAssetType extends BaseAssetType {
  decimals: number;
  mintAuthority: PublicKey | null;
}

export interface ProgramAssetType extends BaseAssetType {}

export interface TokenAccountAssetType extends BaseAssetType {
  owner: PublicKey;
  balance: BN;
  mint: PublicKey;
}

export type Asset = MintAssetType | ProgramAssetType | TokenAccountAssetType;
