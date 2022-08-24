import {
  getGovernanceAccounts,
  Governance,
  pubkeyFilter,
} from "@solana/spl-governance";
import { PublicKey } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import { View, Text, useConnection } from "react-xnft";
import { useRealm } from "../hooks";

function Realm({ realmData }: any) {
  const connection = useConnection();

  // NOTE: Passing strings as PublicKey seems to be working, but passing as new PublicKey("") doesn't work and gets stuck at Loading...
  const { realm, isLoading, mints, governances } = useRealm(
    realmData.realmId,
    realmData.programId
  );

  const [g, setG] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const x = await getGovernanceAccounts(
        connection,
        new PublicKey(realmData.programId),
        Governance,
        [pubkeyFilter(1, new PublicKey(realmData.realmId))!]
      );
      console.log(`sayantan: ${g}`);
      setG(x);
    })();
  }, []);

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
      <Text>
        Governance: {g.length} {governances.data?.length}
      </Text>

      {/* NOTE: Printing JSON.stringify(g[0]) shows the object, but nothing shows up on doing JSON.stringify(g[0]["accountType"]), or any other property as well. */}
      {g.length > 0 && <Text>{JSON.stringify(g[0])}</Text>}
    </View>
  );
}

export default Realm;
