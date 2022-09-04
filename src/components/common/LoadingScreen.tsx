import React from "react";
import { Loading, View } from "react-xnft";

export default function LoadingScreen() {
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
}
