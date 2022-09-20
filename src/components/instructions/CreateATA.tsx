import React from "react";
import { View } from "react-xnft";

export type CreateATAScreenProps = {
  title: string;
};
export default function CreateATAScreen({ title }: CreateATAScreenProps) {
  return <View>{title}</View>;
}
