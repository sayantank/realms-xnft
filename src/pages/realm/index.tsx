import React from "react";
import { Tab, View } from "react-xnft";
import InboxStack from "../../components/icons/InboxStack";
import UserCircle from "../../components/icons/UserCircle";
import ProposalsList from "./proposals";
import TokenOwner from "./token_owner";

const REALM_TAB = "realm_";

export default function Realm({ realmData }: any) {
  return (
    <View style={{ height: "100%", backgroundColor: "#111827" }}>
      <Tab.Navigator
        style={{ backgroundColor: "#111827", border: "none" }}
        options={({ route }) => {
          return {
            tabBarIcon: ({ focused }) => {
              switch (route.name) {
                case REALM_TAB + "proposals":
                  return (
                    <Tab.Icon
                      element={<InboxStack style={{ color: "#4c70bf" }} />}
                    />
                  );
                case REALM_TAB + "token_owner":
                  return (
                    <Tab.Icon
                      element={<UserCircle style={{ color: "#4c70bf" }} />}
                    />
                  );
              }
            },
            tabBarInactiveTintColor: "#111827",
            tabBarActiveTintColor: "#111827",
            tabBarStyle: { color: "111827" },
          };
        }}
      >
        <Tab.Screen
          name={REALM_TAB + "proposals"}
          component={() => <ProposalsList realmData={realmData} />}
        />
        <Tab.Screen
          name={REALM_TAB + "token_owner"}
          component={() => <TokenOwner realmData={realmData} />}
        />
      </Tab.Navigator>
    </View>
  );
}
