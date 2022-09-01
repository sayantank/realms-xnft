import React from "react";
import { View, Text, ScrollBar, List } from "react-xnft";
import { ProposalCard } from "../components/realm/ProposalCard";
import { useRealm } from "../hooks";
import { accountsToPubkeyMap } from "../utils/accounts";
import {
  compareProposals,
  filterProposals,
  InitialFilters,
} from "../utils/proposals";

function RealmPage({ realmData }: any) {
  const { realm, isLoading, mints, governances, proposals } = useRealm(
    realmData.realmId,
    realmData.programId
  );

  if (isLoading)
    return (
      <View
        style={{ height: "100%", padding: "1rem", backgroundColor: "#111827" }}
      >
        <Text>Loading...</Text>
      </View>
    );

  return (
    <ScrollBar style={{}}>
      <View
        style={{ height: "auto", padding: "1rem", backgroundColor: "#111827" }}
      >
        <View>
          <Text
            style={{
              marginBottom: "0.8rem",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            Proposals
          </Text>
          <View>
            {filterProposals(
              Object.entries(proposals.data!).sort(([, a], [, b]) =>
                compareProposals(
                  b.account,
                  a.account,
                  accountsToPubkeyMap(governances.data!)
                )
              ),
              InitialFilters
            ).map(([key, value]) => (
              <ProposalCard key={key} proposal={value} />
            ))}
          </View>
        </View>
      </View>
    </ScrollBar>
  );
}

export default RealmPage;
