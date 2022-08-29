import {
  getGovernanceAccounts,
  getRealm,
  Governance,
  ProgramAccount,
  Proposal,
  pubkeyFilter,
  Realm,
} from "@solana/spl-governance";
import { getMint, Mint } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { useConnection } from "react-xnft";
import useSWR from "swr";
import { accountsToPubkeyMap } from "../utils/accounts";
import { HIDDEN_PROPOSALS } from "../utils/proposals";

const fetchRealm = async (connection: Connection, realmId: string) => {
  // const realm = await getRealm(connection, new PublicKey(realmId));
  // console.log(`realm: ${JSON.stringify(realm)}`);
  // return realm;
  return new Promise<string>((resolve) => resolve(realmId));
};

export const useRealm = (realmId: string, programId: string) => {
  const connection = useConnection();

  const {
    data: realm,
    error: realmError,
    mutate: realmMutate,
    isValidating: realmIsValidating,
  } = useSWR([connection, realmId], fetchRealm);

  const realmLoading = !realm && !realmError;

  return {
    realm: {
      data: realm,
      error: realmError,
      mutate: realmMutate,
      isValidating: realmIsValidating,
      isLoading: realmLoading,
    },

    isLoading: realmLoading,
  };
};

// const fetchMints = async (
//   connection: Connection,
//   realm: ProgramAccount<Realm>
// ) => {
//   const mintsArray = (
//     await Promise.all([
//       realm?.account.communityMint
//         ? getMint(connection, realm.account.communityMint)
//         : undefined,
//       realm?.account.config?.councilMint
//         ? getMint(connection, realm.account.config.councilMint)
//         : undefined,
//     ])
//   ).filter(Boolean);

//   return Object.fromEntries(
//     (mintsArray as Mint[]).map((m) => [m.address.toBase58(), m])
//   );
// };

// const fetchGovernances = async (
//   connection: Connection,
//   realmId: string,
//   programId: string
// ) => {
//   return getGovernanceAccounts(
//     connection,
//     new PublicKey(programId),
//     Governance,
//     [pubkeyFilter(1, new PublicKey(realmId))!]
//   );
// };

// const fetchPropsosals = async (
//   connection: Connection,
//   programId: string,
//   governances: ProgramAccount<Governance>[]
// ) => {
//   const proposalsByGovernance = await Promise.all(
//     governances.map((g) =>
//       getGovernanceAccounts(connection, new PublicKey(programId), Proposal, [
//         pubkeyFilter(1, g.pubkey)!,
//       ])
//     )
//   );

//   return accountsToPubkeyMap(
//     proposalsByGovernance
//       .flatMap((p) => p)
//       .filter((p) => !HIDDEN_PROPOSALS.has(p.pubkey.toBase58()))
//   );
// };
