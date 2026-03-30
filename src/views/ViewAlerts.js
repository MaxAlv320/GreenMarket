import { ScrollView, Text, View } from "react-native";
import AuthCard from "../components/AuthCard";
import BrandLogo from "../components/BrandLogo";
import { useAlerts } from "../hooks/useAlerts";

export default function ViewAlerts() {
  const { alerts } = useAlerts();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F5F5F5", paddingHorizontal: 20 }}
    >
      <View style={{ alignItems: "center", marginTop: 40, marginBottom: 20 }}>
        <BrandLogo />
      </View>
      <View
        style={{
          backgroundColor: "#D9D9D9",
          borderRadius: 20,
          padding: 12,
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", color: "#555" }}>
          {alerts.length === 0 ? "SISTEMA SEGURO" : "ATENCIÓN REQUERIDA"}
        </Text>
      </View>

      {alerts.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text style={{ color: "#888", fontSize: 16 }}>
            Todo en buen estado
          </Text>
        </View>
      ) : (
        alerts.map((alert, index) => (
          <View key={index} style={{ marginBottom: 15 }}>
            <AuthCard title="ALERTA DE STOCK">
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: "#FFF",
                    borderRadius: 8,
                  }}
                />

                <View style={{ flex: 1, marginLeft: 15 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#333",
                      marginBottom: 5,
                    }}
                  >
                    {alert}
                  </Text>
                  <View
                    style={{
                      height: 4,
                      backgroundColor: "#BBB",
                      borderRadius: 2,
                      marginBottom: 4,
                      width: "90%",
                    }}
                  />
                  <View
                    style={{
                      height: 4,
                      backgroundColor: "#BBB",
                      borderRadius: 2,
                      width: "70%",
                    }}
                  />
                </View>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 12.5,
                    backgroundColor: "#888",
                  }}
                />
              </View>
            </AuthCard>
          </View>
        ))
      )}
    </ScrollView>
  );
}
