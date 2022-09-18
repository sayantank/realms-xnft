import React from "react";
import { Text, usePublicKey, View, Button } from "react-xnft";
import LoadingScreen from "../../components/common/LoadingScreen";
import { useRealm, useTokenBalance } from "../../hooks";
import { useTokenOwnerRecord } from "../../hooks";

export default function TokenOwner({ realmData }: any) {
  const owner = usePublicKey();

  const { data: realm, isLoading: realmLoading } = useRealm(
    realmData.realmId,
    realmData.programId
  );

  const { communityTokenOwnerRecord, isLoading: tokenOwnerLoading } =
    useTokenOwnerRecord(owner, realmData.programId, realm?.account);

  const { balance, isLoading: balanceLoading } = useTokenBalance(
    owner,
    realm ? realm.communityMint.address : undefined
  );

  if (tokenOwnerLoading || balanceLoading || realmLoading) {
    return <LoadingScreen />;
  }

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
            marginBottom: "0.4rem",
          }}
        >
          <Text style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 500 }}>
            Community Tokens
          </Text>
          <Text style={{ color: "grey", fontSize: "0.7rem", fontWeight: 400 }}>
            Balance: {balance ? balance.uiAmount : 0}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            padding: "0.4rem 0.6rem",
            borderRadius: "0.4rem",
            marginBottom: "0.6rem",
          }}
        >
          <Text style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            {communityTokenOwnerRecord.data
              ? communityTokenOwnerRecord.data.account
                  .governingTokenDepositAmount
              : 0}
          </Text>
        </View>
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
          >
            Deposit
          </Button>
          <Button
            style={{
              flex: 1,
              marginLeft: "0.5rem",
              backgroundColor: "#324d89",
              color: "#fff",
            }}
          >
            Withdraw
          </Button>
        </View>
      </View>
    </View>
  );
}
