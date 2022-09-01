import React from "react";
import { Stack, View, Text, Button } from "react-xnft";
import Home from "./pages/Home";
import Realm from "./pages/Realm";

export function App() {
  return (
    <Stack.Navigator
      initialRoute={{ name: "home" }}
      options={({ route }) => {
        switch (route.name) {
          case "home":
            return {
              title: "Realms",
            };
          case "realm":
            return {
              title: route.props.realmData.displayName,
            };
          default:
            throw new Error("unknown route");
        }
      }}
    >
      <Stack.Screen
        name={"home"}
        component={(props: any) => <Home {...props} />}
      />
      <Stack.Screen
        name={"realm"}
        component={(props: any) => <Realm {...props} />}
      />
    </Stack.Navigator>
  );
}
