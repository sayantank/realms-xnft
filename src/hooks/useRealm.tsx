import { getRealm } from "@solana/spl-governance";
import { Connection, PublicKey } from "@solana/web3.js";
import { useConnection } from "react-xnft";
import useSWR from "swr";

const fetcher = (connection: Connection, realmAddress: PublicKey) => {
  return getRealm(connection, realmAddress);
};

export const useRealm = (realmAddress: string) => {
  const connection = useConnection();

  const { data, error, mutate, isValidating } = useSWR(
    [connection, realmAddress],
    fetcher
  );

  const isLoading = !data && !error;

  return {
    realm: data,
    isLoading,
    isValidating,
    mutate,
    error,
  };
};
