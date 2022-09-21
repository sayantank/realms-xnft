import { Transaction } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import {
  Text,
  usePublicKey,
  View,
  Button,
  TextField,
  useConnection,
  useDidLaunch,
} from "react-xnft";
import LoadingScreen from "../../components/common/LoadingScreen";
import { useRealm, useTokenBalance } from "../../hooks";
import { useTokenOwnerRecord } from "../../hooks";
import { IRealm } from "../../lib/interfaces/realm";
import {
  tokenAtomicsToPrettyDecimal,
  tokenDecimalsToAtomics,
} from "../../utils/token";

// We can assume realm is defined because loading/error taken care of at index.
export default function TokenOwner({ realm }: { realm?: IRealm }) {
  const didLaunch = useDidLaunch();
  const connection = useConnection();
  const owner = usePublicKey();

  const {
    communityTokenOwnerRecord,
    councilTokenOwnerRecord,
    isLoading: tokenOwnerLoading,
  } = useTokenOwnerRecord(owner, realm!.programId.toString(), realm?.account);

  const { balance, isLoading: balanceLoading } = useTokenBalance(
    owner,
    realm!.communityMint.address
  );

  const [communityAmount, setCommunityAmount] = useState(0);

  if (tokenOwnerLoading || balanceLoading) {
    return <LoadingScreen />;
  }

  const canDepositCommunityTokens =
    balance &&
    balance.uiAmount &&
    communityTokenOwnerRecord.data &&
    communityAmount <= balance.uiAmount;

  const handleDeposit = async () => {
    if (!didLaunch) throw new Error("xnft object unavailable.");
    // Required possible undefined objects and other checks are to be handled in `disabled` prop.

    const { instructions, preInstructions, postInstructions } =
      await realm!.getDepositCommunityTokenInstructions(
        connection,
        tokenDecimalsToAtomics(communityAmount, realm!.communityMint.decimals),
        owner
      );

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();
    const tx = new Transaction({
      feePayer: owner,
      blockhash,
      lastValidBlockHeight,
    }).add(...preInstructions, ...instructions, ...postInstructions);

    const sig = await window.xnft.send(tx);
    await connection.confirmTransaction(
      {
        blockhash: blockhash,
        lastValidBlockHeight: lastValidBlockHeight,
        signature: sig,
      },
      // confirmed doesn't seem to be long enough for mutate
      "confirmed"
    );

    setCommunityAmount(0);

    await communityTokenOwnerRecord.mutate();
  };

  return (
    <View
      style={{ height: "100%", padding: "1rem", backgroundColor: "#111827" }}
    >
      <View style={{ marginBottom: "0.6rem" }}>
        <Text
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          DAO Profile
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          display: "grid",
          gap: "0.6rem",
          gridTemplateColumns: "1fr 1fr",
          marginBottom: "0.8rem",
        }}
      >
        <View
          style={{
            borderRadius: "0.8rem",
            backgroundColor: "#1F2937",
            padding: "0.6rem",
          }}
        >
          <Text style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 500 }}>
            Community Weight
          </Text>
          <Text style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            {communityTokenOwnerRecord.data
              ? tokenAtomicsToPrettyDecimal(
                  communityTokenOwnerRecord.data.account
                    .governingTokenDepositAmount,
                  realm!.communityMint.decimals,
                  2
                )
              : 0}
          </Text>
        </View>
        <View
          style={{
            borderRadius: "0.8rem",
            backgroundColor: "#1F2937",
            padding: "0.6rem",
            opacity: councilTokenOwnerRecord.data ? "100%" : "30%",
          }}
        >
          <Text style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 500 }}>
            Council Weight
          </Text>
          <Text style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            {councilTokenOwnerRecord.data
              ? tokenAtomicsToPrettyDecimal(
                  councilTokenOwnerRecord.data.account
                    .governingTokenDepositAmount,
                  realm!.councilMint ? realm!.councilMint.decimals : 6, // assured to work given !!councilTokenOwnerRecord.data
                  2
                )
              : 0}
          </Text>
        </View>
      </View>
      <View
        style={{
          padding: "0.8rem",
          backgroundColor: "#1F2937",
          borderRadius: "0.6rem",
        }}
      >
        <View
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.2rem",
          }}
        >
          <Text style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 500 }}>
            Community Tokens
          </Text>
          <Text style={{ color: "grey", fontSize: "0.7rem", fontWeight: 400 }}>
            Balance: {balance ? balance.uiAmount : 0}
          </Text>
        </View>
        <TextField
          type="number"
          value={communityAmount}
          onChange={(e) => setCommunityAmount(Number(e.data.value))}
          style={{ marginBottom: "0.4rem" }}
        />
        <View
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "0.4rem",
          }}
        >
          <Button
            style={{
              flex: 1,
              marginRight: "0.5rem",
              backgroundColor: "#324d89",
              color: "#fff",
            }}
            onClick={handleDeposit}
            disabled={!canDepositCommunityTokens}
          >
            Deposit
          </Button>
          <Button
            disabled={true}
            style={{
              flex: 1,
              marginLeft: "0.5rem",
              backgroundColor: "#324d89",
              color: "#fff",
            }}
            onClick={() => console.log("TEST: withdraw")}
          >
            Withdraw
          </Button>
        </View>
      </View>
    </View>
  );
}
