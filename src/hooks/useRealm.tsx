import { Connection, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useConnection } from "react-xnft";
import useSWR from "swr";
import { BasicRealm } from "../lib";
import { IRealm } from "../lib/interfaces/realm";
import { tryParseKey } from "../utils/pubkey";

const fetchRealm = async (
  connection: Connection,
  realmId: PublicKey,
  programId: PublicKey,
  imageUrl?: string
): Promise<IRealm> => {
  switch (realmId.toBase58()) {
    default:
      return BasicRealm.load(connection, realmId, programId, imageUrl);
  }
};

export const useRealm = (realmId: string, programId: string) => {
  const connection = useConnection();

  const [realmPubkey, setRealmPubkey] = useState<PublicKey | null>(null);
  const [programPubkey, setProgramPubkey] = useState<PublicKey | null>(null);

  useEffect(() => {
    setRealmPubkey(tryParseKey(realmId) || null);
    setProgramPubkey(tryParseKey(programId) || null);
  }, []);

  const { data, error, mutate, isValidating } = useSWR(
    () =>
      realmPubkey && programPubkey && [connection, realmPubkey, programPubkey],
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
