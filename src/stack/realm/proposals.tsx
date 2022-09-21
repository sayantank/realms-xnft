import { ProgramAccount, Proposal } from "@solana/spl-governance";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollBar, Button, useNavigation } from "react-xnft";
import { APP_STACK } from "../../App";
import TitleCTA from "../../components/common/TitleCTA";
import { ProposalCard } from "../../components/realm/proposals/ProposalCard";
import { IRealm } from "../../lib/interfaces/realm";
import {
  filterProposals,
  Filters,
  InitialFilters,
} from "../../utils/proposals";

// We can assume realm is defined because loading/error taken care of at index.
function ProposalsList({ realm }: { realm?: IRealm }) {
  const nav = useNavigation();

  const [proposalFilter, setProposalFilter] = useState<Filters>(InitialFilters);

  const [filteredProposal, setFilteredProposal] = React.useState<
    ProgramAccount<Proposal>[]
  >([]);

  useEffect(() => {
    if (realm) {
      const filtered = filterProposals(realm.proposals, proposalFilter);
      setFilteredProposal(filtered);
    }
  }, [realm, proposalFilter]);

  return (
    <ScrollBar style={{}}>
      <View
        style={{ height: "100%", padding: "1rem", backgroundColor: "#111827" }}
      >
        <TitleCTA title="Proposals">
          <Button
            style={{
              backgroundColor: "#182541",
              color: "white",
              width: "auto",
            }}
            disabled={true}
            onClick={() =>
              nav.push(APP_STACK + "create_proposal", { realm: realm })
            }
          >
            Create
          </Button>
        </TitleCTA>
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
