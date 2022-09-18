import { clusterApiUrl } from "@solana/web3.js";
import React, { useEffect } from "react";
import {
  Button,
  Text,
  Image,
  useNavigation,
  View,
  useConnection,
} from "react-xnft";
import { APP_STACK } from "../App";
import { DEVNET_REALMS, MAINNET_REALMS } from "../utils/realms";

function HomePage() {
  const connection = useConnection();
  const nav = useNavigation();

  // const REALMS =
  //   connection.rpcEndpoint === clusterApiUrl("mainnet-beta")
  //     ? MAINNET_REALMS
  //     : connection.rpcEndpoint === clusterApiUrl("devnet")
  //     ? DEVNET_REALMS
  //     : undefined;

  useEffect(() => {
    nav.setTitleStyle({
      fontSize: "1.2rem",
      fontWeight: "bold",
    });
    nav.setStyle({
      backgroundColor: "#111827",
    });
  }, []);

  return (
    <View
      style={{ height: "100%", padding: "1rem", backgroundColor: "#111827" }}
    >
      <View>
        <Text
          style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            marginBottom: "0.4rem",
          }}
        >
          Featured
        </Text>
        <View
          style={{
            width: "100%",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "0.8rem",
          }}
        >
          {DEVNET_REALMS.map((realmData) => (
            <Button
              onClick={() => nav.push(APP_STACK + "realm", { realmData })}
              key={realmData.realmId}
              style={{
                width: "100%",
                borderRadius: "0.6rem",
                height: "min-content",
                padding: "1rem",
                backgroundColor: "#1d2433",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Image
                src={realmData.ogImage}
                style={{
                  width: "auto",
                  height: "2.4rem",
                  marginBottom: "0.6rem",
                  padding: "0rem 0.6rem",
                }}
              />
              <Text style={{ fontSize: "0.7rem" }}>
                {realmData.displayName}
              </Text>
            </Button>
          ))}
        </View>
      </View>
    </View>
  );
}

export default HomePage;
