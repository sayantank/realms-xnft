import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { useConnection } from "react-xnft";
import useSWR from "swr";

const fetchBalance = async (
  connection: Connection,
  owner: PublicKey,
  mint: PublicKey
) => {
  const tokenAccount = await getAssociatedTokenAddressSync(mint, owner, true);
  const balance = await connection.getTokenAccountBalance(
    tokenAccount,
    "confirmed"
  );
  return balance.value;
};

export const useTokenBalance = (owner: PublicKey, mint?: PublicKey) => {
  const connection = useConnection();

  const {
    data: balance,
    error: balanceError,
    mutate: balanceMutate,
    isValidating: balanceIsValidating,
  } = useSWR(() => mint && [connection, owner, mint], fetchBalance);

  const isLoading = !balance && !balanceError;

  return {
    balance,
    balanceError,
    balanceMutate,
    balanceIsValidating,
    isLoading,
  };
};
