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

const fetchRealm = (
  connection: Connection,
  realmAddress: string
): Promise<ProgramAccount<Realm>> => {
  return getRealm(connection, new PublicKey(realmAddress));
};

const fetchMints = async (
  connection: Connection,
  realm: ProgramAccount<Realm>
): Promise<Record<string, Mint>> => {
  const mintsArray = (
    await Promise.all([
      realm?.account.communityMint
        ? getMint(connection, realm.account.communityMint)
        : undefined,
      realm?.account.config?.councilMint
        ? getMint(connection, realm.account.config.councilMint)
        : undefined,
    ])
  ).filter(Boolean);

  return Object.fromEntries(
    (mintsArray as Mint[]).map((m) => [m.address.toBase58(), m])
  );
};

const fetchGovernances = async (
  connection: Connection,
  realmId: string,
  programId: string
): Promise<ProgramAccount<Governance>[]> => {
  return getGovernanceAccounts(
    connection,
    new PublicKey(programId),
    Governance,
    [pubkeyFilter(1, new PublicKey(realmId))!]
  );
};

const fetchPropsosals = async (
  connection: Connection,
  programId: string,
  governances: ProgramAccount<Governance>[]
): Promise<Record<string, ProgramAccount<Proposal>>> => {
  const proposalsByGovernance = await Promise.all(
    governances.map((g) =>
      getGovernanceAccounts(connection, new PublicKey(programId), Proposal, [
        pubkeyFilter(1, g.pubkey)!,
      ])
    )
  );

  return accountsToPubkeyMap(
    proposalsByGovernance
      .flatMap((p) => p)
      .filter((p) => !HIDDEN_PROPOSALS.has(p.pubkey.toBase58()))
  );
};

export const useRealm = (realmId: string, programId: string) => {
  // console.log(`typeof realmId: ${typeof realmId}`);
  const connection = useConnection();

  const {
    data: realm,
    error: realmError,
    mutate: realmMutate,
    isValidating: realmIsValidating,
  } = useSWR([connection, realmId], fetchRealm);

  const realmLoading = !realm && !realmError;

  const {
    data: mints,
    error: mintsError,
    mutate: mintsMutate,
    isValidating: mintsIsValidating,
  } = useSWR(() => realm && [connection, realm, "mints"], fetchMints);

  const mintsLoading = !mints && !mintsError;

  const {
    data: governances,
    error: governancesError,
    mutate: governancesMutate,
    isValidating: governancesIsValidating,
  } = useSWR(
    () => realm && [connection, realmId, programId, "governances"],
    fetchGovernances
  );

  const governancesLoading = !governances && !governancesError;

  const {
    data: proposals,
    error: proposalsError,
    mutate: proposalsMutate,
    isValidating: proposalsIsValidating,
  } = useSWR(
    () =>
      realm && governances && [connection, programId, governances, "proposals"],
    fetchPropsosals
  );

  const proposalsLoading = !proposals && !proposalsError;

  return {
    realm: {
      data: realm,
      error: realmError,
      mutate: realmMutate,
      isValidating: realmIsValidating,
      isLoading: realmLoading,
    },
    mints: {
      data: mints,
      error: mintsError,
      mutate: mintsMutate,
      isValidating: mintsIsValidating,
      isLoading: mintsLoading,
    },
    governances: {
      data: governances,
      error: governancesError,
      mutate: governancesMutate,
      isValidating: governancesIsValidating,
      isLoading: governancesLoading,
    },
    proposals: {
      data: proposals,
      error: proposalsError,
      mutate: proposalsMutate,
      isValidating: proposalsIsValidating,
      isLoading: proposalsLoading,
    },
    isLoading:
      realmLoading || mintsLoading || governancesLoading || proposalsLoading,
  };
};
