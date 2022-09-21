import React from "react";
import { Tab, View } from "react-xnft";
import LoadingScreen from "../../components/common/LoadingScreen";
import Folder from "../../components/icons/Folder";
import InboxStack from "../../components/icons/InboxStack";
import UserCircle from "../../components/icons/UserCircle";
import { useRealm } from "../../hooks";
import ProposalsList from "./proposals";
import TokenOwner from "./token_owner";
import Treasury from "./treasury";

const REALM_TAB = "realm_";

export default function Realm({ realmData }: any) {
  const {
    data: realm,
    isLoading,
    error,
  } = useRealm(realmData.realmId, realmData.programId);

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <View>Error</View>;
  }

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
                case REALM_TAB + "treasury":
                  return (
                    <Tab.Icon
                      element={<Folder style={{ color: "#4c70bf" }} />}
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
          component={() => <ProposalsList realm={realm} />}
        />
        <Tab.Screen
          name={REALM_TAB + "token_owner"}
          component={() => <TokenOwner realm={realm} />}
        />
        <Tab.Screen
          name={REALM_TAB + "treasury"}
          component={() => <Treasury realm={realm} />}
        />
      </Tab.Navigator>
    </View>
  );
}
