import { BN_ZERO, ProgramAccount, Proposal } from "@solana/spl-governance";
import React, { useEffect } from "react";
import { View, Text, Button } from "react-xnft";
import BN from "bn.js";

type Props = {
  proposal: ProgramAccount<Proposal>;
};
export const ProposalCard = ({ proposal }: Props) => {
  const [yesPercentage, setYesPercentage] = React.useState(0);
  const [noPercentage, setNoPercentage] = React.useState(0);

  useEffect(() => {
    const totalVotes = proposal.account
      .getYesVoteCount()
      .add(proposal.account.getNoVoteCount());

    if (totalVotes.gt(BN_ZERO)) {
      const yes = proposal.account
        .getYesVoteCount()
        .mul(new BN(100))
        .div(totalVotes)
        .toNumber();
      setYesPercentage(yes);

      setNoPercentage(100 - yes);
    }
  }, [proposal]);

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#1F2937",
        marginBottom: "1rem",
        borderRadius: "0.6rem",
        overflow: "hidden",
      }}
    >
      <View style={{ padding: "1rem" }}>
        <Text
          style={{
            fontSize: "0.9rem",
            fontWeight: "bold",
          }}
        >
          {proposal.account.name}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          padding: "1rem",
          backgroundColor: "rgba(255, 255, 255, 0.04)",
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.4rem",
          }}
        >
          <View>
            <Text
              style={{ fontSize: "0.6rem", color: "rgba(255, 255, 255, 0.65)" }}
            >
              Yes Votes
            </Text>
            <Text style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
              {yesPercentage}%
            </Text>
          </View>

          <View style={{ textAlign: "right" }}>
            <Text
              style={{ fontSize: "0.6rem", color: "rgba(255, 255, 255, 0.65)" }}
            >
              No Votes
            </Text>
            <Text style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
              {noPercentage}%
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            height: "8px",
            borderRadius: "20rem",
            overflow: "hidden",
            marginBottom: "0.8rem",
          }}
        >
          {yesPercentage || noPercentage ? (
            <>
              <View
                style={{
                  display: "inline",
                  width: `${yesPercentage}%`,
                  backgroundColor: "#2AC192",
                  height: "100%",
                }}
              />
              <View
                style={{
                  display: "inline",
                  width: `${noPercentage}%`,
                  backgroundColor: "#ca3957",
                  height: "100%",
                }}
              />
            </>
          ) : (
            <>
              <View
                style={{
                  display: "inline",
                  width: `100%`,
                  backgroundColor: "#1F2937",
                  height: "100%",
                }}
              />
            </>
          )}
        </View>
        <View style={{ display: "flex" }}>
          <Button
            style={{
              flex: 1,
              marginRight: "0.5rem",
              backgroundColor: "#1F2937",
              color: "#fff",
            }}
          >
            Vote Yes
          </Button>
          <Button
            style={{
              flex: 1,
              marginLeft: "0.5rem",
              backgroundColor: "#1F2937",
              color: "#fff",
            }}
          >
            Vote No
          </Button>
        </View>
      </View>
    </View>
  );
};
