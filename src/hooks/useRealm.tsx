import {
  getGovernanceAccounts,
  getRealm,
  Governance,
  ProgramAccount,
  pubkeyFilter,
  Realm,
} from "@solana/spl-governance";
import { getMint, Mint } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { useConnection } from "react-xnft";
import useSWR from "swr";

const fetchRealm = (connection: Connection, realmAddress: PublicKey) => {
  return getRealm(connection, realmAddress);
};

const fetchMints = async (
  connection: Connection,
  realm: ProgramAccount<Realm>
) => {
  console.log("haha");
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
  realmId: PublicKey,
  programId: PublicKey
) => {
  const x = await getGovernanceAccounts(connection, programId, Governance, [
    pubkeyFilter(1, realmId)!,
  ]);

  return x;
};

export const useRealm = (realmId: PublicKey, programId: PublicKey) => {
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

  return {
    realm: {
      data: realm,
      error: realmError,
      mutate: realmMutate,
      isValidating: realmIsValidating,
    },
    mints: {
      data: mints,
      error: mintsError,
      mutate: mintsMutate,
      isValidating: mintsIsValidating,
    },
    governances: {
      data: governances,
      error: governancesError,
      mutate: governancesMutate,
      isValidating: governancesIsValidating,
    },
    isLoading: realmLoading || mintsLoading || governancesLoading,
  };
};
