import {
  getGovernanceAccounts,
  Governance,
  pubkeyFilter,
} from "@solana/spl-governance";
import { PublicKey } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import { View, Text, useConnection, ScrollBar } from "react-xnft";
import { useRealm } from "../hooks";

function Realm({ realmData }: any) {
  const connection = useConnection();

  // NOTE: Passing strings as PublicKey seems to be working, but passing as new PublicKey("") doesn't work and gets stuck at Loading...
  const { realm, isLoading, mints, governances } = useRealm(
    realmData.realmId,
    realmData.programId
  );

  // Show loading maybe
  if (isLoading)
    return (
      <View
        style={{ height: "100%", padding: "1rem", backgroundColor: "#111827" }}
      >
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View
      style={{ height: "100%", padding: "1rem", backgroundColor: "#111827" }}
    >
      <ScrollBar>
        <Text>{realmData.symbol}</Text>
        <Text>
          Community Mint:{" "}
          {realm.data!.account.communityMint.toBase58().slice(0, 10)}...
        </Text>
        <Text>
          Supply:{" "}
          {mints.data![
            realm.data!.account.communityMint.toBase58()
          ].supply.toString()}
        </Text>
        {/* NOTE: g.length comes out to be 0 and then updates to 2, but nothing shows up for governances.data.length*/}
        <Text>Governance: {JSON.stringify(governances)}</Text>
      </ScrollBar>
    </View>
  );
}

export default Realm;
