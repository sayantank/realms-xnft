import React from "react";
import { Stack, View, Text, Button } from "react-xnft";
import CreateProposal from "./stack/create_proposal";
import Home from "./stack/home";
import Realm from "./stack/realm";

export const APP_STACK = "app_";

export function App() {
  return (
    <Stack.Navigator
      initialRoute={{ name: APP_STACK + "home" }}
      options={({ route }) => {
        switch (route.name) {
          case APP_STACK + "home":
            return {
              title: "Realms",
            };
          case APP_STACK + "realm":
            return {
              title: route.props.realmData.displayName,
            };
          case APP_STACK + "create_proposal":
            return {
              title: "Create Proposal",
            };
          default:
            throw new Error("unknown route");
        }
      }}
    >
      <Stack.Screen
        name={APP_STACK + "home"}
        component={(props: any) => <Home {...props} />}
      />
      <Stack.Screen
        name={APP_STACK + "realm"}
        component={(props: any) => <Realm {...props} />}
      />
      <Stack.Screen
        name={APP_STACK + "create_proposal"}
        component={(props: any) => <CreateProposal {...props} />}
      />
    </Stack.Navigator>
  );
}
