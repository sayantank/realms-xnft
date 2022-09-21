import React from "react";
import { ScrollBar, View } from "react-xnft";
import { IRealm } from "../../lib/interfaces/realm";

export default function Treasury({ realm }: { realm?: IRealm }) {
  return (
    <ScrollBar>
      <View
        style={{ height: "100%", padding: "1rem", backgroundColor: "#111827" }}
      >
        <View>
          {realm!.nativeTreasuries.map((treasury) => (
            <View>{treasury.address.toBase58()}</View>
          ))}
        </View>
      </View>
    </ScrollBar>
  );
}
