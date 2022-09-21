import React from "react";
import { View, Text } from "react-xnft";

type TitleCTAProps = {
  children?: React.ReactNode;
  title: string;
};
export default function TitleCTA({ children, title }: TitleCTAProps) {
  return (
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
          flex: 1,
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
      <View>{children}</View>
    </View>
  );
}
