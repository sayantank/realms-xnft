import { ProgramAccount } from "@solana/spl-governance";
import { arrayToRecord } from "./helpers";

export function accountsToPubkeyMap<T>(accounts: ProgramAccount<T>[]) {
  return arrayToRecord(accounts, (a) => a.pubkey.toBase58());
}
