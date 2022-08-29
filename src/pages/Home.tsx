import React, { useEffect } from "react";
import { Button, Text, Image, useNavigation, View } from "react-xnft";

const REALMS = [
  {
    symbol: "MNGO",
    displayName: "Mango DAO",
    programId: "GqTPL6qRf5aUuqscLh8Rg2HTxPUXfhhAXDptTLhp1t2J",
    realmId: "DPiH3H3c7t47BMxqTxLsuPQpEC6Kne8GA9VXbxpnZxFE",
    website: "https://mango.markets",
    ogImage: "https://trade.mango.markets/assets/icons/logo.svg",
  },
  // {
  //   symbol: "PSY",
  //   displayName: "Psy Finance",
  //   programId: "GovHgfDPyQ1GwazJTDY2avSVY8GGcpmCapmmCsymRaGe",
  //   realmId: "FiG6YoqWnVzUmxFNukcRVXZC51HvLr6mts8nxcm7ScR8",
  //   website: "https://psyoptions.io",
  //   ogImage:
  //     "https://user-images.githubusercontent.com/32071703/149460918-3694084f-2a37-4c95-93d3-b5aaf078d444.png",
  // },
  // {
  //   symbol: "SERUM",
  //   displayName: "Serum DAO",
  //   programId: "AVoAYTs36yB5izAaBkxRG67wL1AMwG3vo41hKtUSb8is",
  //   realmId: "3MMDxjv1SzEFQDKryT7csAvaydYtrgMAc3L9xL9CVLCg",
  //   website: "https://www.projectserum.com/",
  //   ogImage:
  //     "https://assets.website-files.com/61284dcff241c2f0729af9f3/61285237ce2e301255d09108_logo-serum.png",
  // },
];

function Home() {
  const nav = useNavigation();

  useEffect(() => {
    nav.setTitleStyle({
      fontSize: "1.4rem",
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
          {REALMS.map((realmData) => (
            <Button
              onClick={() => nav.push("realm", { realmData })}
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

export default Home;
