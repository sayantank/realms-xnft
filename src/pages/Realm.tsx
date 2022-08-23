import React from "react";
import { View, Text } from "react-xnft";
import { useRealm } from "../hooks";

function Realm({ realm }: any) {
  const { realm: realmData } = useRealm(realm.realmId);

  // Show loading maybe
  if (!realmData) return null;

  return (
    <View
      style={{ height: "100%", padding: "1rem", backgroundColor: "#111827" }}
    >
      <Text>{realm.symbol}</Text>
      <Text>
        Community Mint:{" "}
        {realmData.account.communityMint.toBase58().slice(0, 10)}...
      </Text>
    </View>
  );
}

export default Realm;
