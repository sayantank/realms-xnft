import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollBar,
  List,
  Loading,
  Button,
  useNavigation,
} from "react-xnft";
import { APP_STACK } from "../../App";
import { ProposalCard } from "../../components/realm/ProposalCard";
import { useRealm } from "../../hooks";
import { accountsToPubkeyMap } from "../../utils/accounts";
import {
  compareProposals,
  filterProposals,
  InitialFilters,
} from "../../utils/proposals";

function ProposalsList({ realmData }: any) {
  const nav = useNavigation();

  const { realm, isLoading, mints, governances, proposals } = useRealm(
    realmData.realmId,
    realmData.programId
  );

  if (isLoading)
    return (
      <View
        style={{
          height: "100%",
          padding: "1rem",
          backgroundColor: "#111827",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </View>
    );

  return (
    <ScrollBar style={{}}>
      <View
        style={{ height: "100%", padding: "1rem", backgroundColor: "#111827" }}
      >
        <View
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <Text
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            Proposals
          </Text>
          <Button
            style={{ backgroundColor: "#182541", color: "white" }}
            onClick={() =>
              nav.push(APP_STACK + "create_proposal", { realm: realm.data })
            }
          >
            Create
          </Button>
        </View>
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
    </ScrollBar>
  );
}

export default ProposalsList;
