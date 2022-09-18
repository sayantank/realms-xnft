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

const fetchRealm = async (connection: Connection, realmAddress: string) => {
  const realm = await getRealm(connection, new PublicKey(realmAddress));
  const programId = realm.owner;

  const mintsArray = (
    await Promise.all([
      realm.account.communityMint
        ? getMint(connection, realm.account.communityMint)
        : undefined,
      realm.account.config?.councilMint
        ? getMint(connection, realm.account.config.councilMint)
        : undefined,
    ])
  ).filter(Boolean);

  const mints = Object.fromEntries(
    (mintsArray as Mint[]).map((m) => [m.address.toBase58(), m])
  );

  const governances = await getGovernanceAccounts(
    connection,
    new PublicKey(programId),
    Governance,
    [pubkeyFilter(1, realm.pubkey)!]
  );

  const proposalsByGovernance = await Promise.all(
    governances.map((g) =>
      getGovernanceAccounts(connection, new PublicKey(programId), Proposal, [
        pubkeyFilter(1, g.pubkey)!,
      ])
    )
  );

  const proposals = accountsToPubkeyMap(
    proposalsByGovernance
      .flatMap((p) => p)
      .filter((p) => !HIDDEN_PROPOSALS.has(p.pubkey.toBase58()))
  );

  return {
    realm,
    mints,
    governances,
    proposals,
    programId,
  };
};

export const useRealm = (realmId: string, programId: string) => {
  // console.log(`typeof realmId: ${typeof realmId}`);
  const connection = useConnection();

  const { data, error, mutate, isValidating } = useSWR(
    [connection, realmId],
    fetchRealm
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading: !data && !error,
  };
};
