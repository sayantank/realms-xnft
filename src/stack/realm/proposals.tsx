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
import {
  filterProposals,
  Filters,
  InitialFilters,
} from "../../utils/proposals";

function ProposalsList({ realmData }: any) {
  const nav = useNavigation();

  const [proposalFilter, setProposalFilter] = useState<Filters>(InitialFilters);

  const {
    data: realm,
    isLoading,
    error,
  } = useRealm(realmData.realmId, realmData.programId);

  const [filteredProposal, setFilteredProposal] = React.useState<
    ProgramAccount<Proposal>[]
  >([]);

  useEffect(() => {
    if (realm) {
      const filtered = filterProposals(realm.proposals, proposalFilter);
      setFilteredProposal(filtered);
    }
  }, [realm, proposalFilter]);

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
            disabled={true}
            onClick={() =>
              nav.push(APP_STACK + "create_proposal", { realm: realm })
            }
          >
            Create
          </Button>
        </View>
        <View>
          {filteredProposal.map((p) => (
            <ProposalCard key={p.pubkey.toBase58()} proposal={p} />
          ))}
        </View>
      </View>
    </ScrollBar>
  );
}

export default ProposalsList;
