import {
  Realm,
  getTokenOwnerRecordForRealm,
  ProgramAccount,
} from "@solana/spl-governance";
import { Connection, PublicKey } from "@solana/web3.js";
import { useConnection } from "react-xnft";
import useSWR from "swr";

const fetchTokenOwnerRecord = async (
  connection: Connection,
  realmId: PublicKey,
  programId: string,
  owner: PublicKey,
  governingToken?: PublicKey
) => {
  if (!governingToken) throw Error("No governing token");

  return getTokenOwnerRecordForRealm(
    connection,
    new PublicKey(programId),
    realmId,
    governingToken,
    owner
  );
};

export const useTokenOwnerRecord = (
  owner: PublicKey,
  programId: string,
  realm?: ProgramAccount<Realm>
) => {
  const connection = useConnection();

  const {
    data: communityTokenOwnerRecord,
    error: communityTokenOwnerRecordError,
    mutate: communityTokenOwnerRecordMutate,
    isValidating: communityTokenOwnerRecordIsValidating,
  } = useSWR(
    () =>
      realm && [
        connection,
        realm.pubkey,
        programId,
        owner,
        realm.account.communityMint,
      ],
    fetchTokenOwnerRecord
  );

  const communityTokenOwnerRecordLoading =
    !communityTokenOwnerRecord && !communityTokenOwnerRecordError;

  return {
    communityTokenOwnerRecord: {
      data: communityTokenOwnerRecord,
      error: communityTokenOwnerRecordError,
      mutate: communityTokenOwnerRecordMutate,
      isValidating: communityTokenOwnerRecordIsValidating,
    },
    isLoading: communityTokenOwnerRecordLoading,
  };
};
