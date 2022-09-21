import React from "react";
import { Button, ScrollBar, useNavigation, View } from "react-xnft";
import { APP_STACK } from "../../App";
import TitleCTA from "../../components/common/TitleCTA";
import { IRealm } from "../../lib/interfaces/realm";

export default function Treasury({ realm }: { realm?: IRealm }) {
  const nav = useNavigation();
  return (
    <ScrollBar>
      <View
        style={{ height: "100%", padding: "1rem", backgroundColor: "#111827" }}
      >
        <TitleCTA title="Treasury">
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
            Add Wallet
          </Button>
        </TitleCTA>
        <View>yoooooooo</View>
      </View>
    </ScrollBar>
  );
}
