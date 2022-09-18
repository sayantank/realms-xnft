import { ProgramAccount, Proposal } from "@solana/spl-governance";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollBar,
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

  const { data, isLoading, error } = useRealm(
    realmData.realmId,
    realmData.programId
  );

  const [filteredProposal, setFilteredProposal] = React.useState<
    [string, ProgramAccount<Proposal>][]
  >([]);

  useEffect(() => {
    if (data) {
      const filtered = filterProposals(
        Object.entries(data.proposals).sort(([, a], [, b]) =>
          compareProposals(
            b.account,
            a.account,
            accountsToPubkeyMap(data.governances)
          )
        ),
        InitialFilters
      );
      setFilteredProposal(filtered);
    }
  }, [data]);

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

  if (error)
    return (
      <View
        style={{ height: "100%", padding: "1rem", backgroundColor: "#111827" }}
      >
        Something went wrong.
        {error && JSON.stringify(error)}
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
              nav.push(APP_STACK + "create_proposal", { realm: data!.realm })
            }
          >
            Create
          </Button>
        </View>
        <View>
          {filteredProposal.map(([key, value]) => (
            <ProposalCard key={key} proposal={value} />
          ))}
        </View>
      </View>
    </ScrollBar>
  );
}

export default ProposalsList;
