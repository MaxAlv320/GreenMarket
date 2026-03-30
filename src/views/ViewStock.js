import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import AuthCard from "../components/AuthCard";
import BrandLogo from "../components/BrandLogo";
import { useStock } from "../hooks/useStock";

export default function ViewStock() {
  const { items, increaseStock, decreaseStock } = useStock();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F5F5F5", paddingHorizontal: 20 }}
    >
      {/* Header con el Logo */}
      <View style={{ alignItems: "center", marginTop: 40, marginBottom: 20 }}>
        <BrandLogo />
      </View>

      {/* Título de la sección */}
      <View
        style={{
          backgroundColor: "#D9D9D9",
          borderRadius: 20,
          padding: 10,
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", color: "#555" }}>
          CONTROL DE STOCK
        </Text>
      </View>

      {/* Lista de productos en Stock */}
      {items.map((item) => (
        <View key={item.id} style={{ marginBottom: 15 }}>
          <AuthCard title={item.name}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* Representación de imagen circular */}
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#FFF",
                }}
              />

              {/* Información del Stock */}
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={{ fontSize: 12, color: "#666", marginBottom: 2 }}>
                  Cantidad actual:
                </Text>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#333" }}
                >
                  {item.stock}
                </Text>
              </View>

              {/* Botones de Control (+ / -) */}
              <View style={{ flexDirection: "column", gap: 5 }}>
                <TouchableOpacity
                  onPress={() => increaseStock(item.id)}
                  style={{
                    width: 35,
                    height: 35,
                    backgroundColor: "#333",
                    borderRadius: 6,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: "#FFF", fontWeight: "bold", fontSize: 20 }}
                  >
                    +
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => decreaseStock(item.id)}
                  style={{
                    width: 35,
                    height: 35,
                    backgroundColor: "#666",
                    borderRadius: 6,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: "#FFF", fontWeight: "bold", fontSize: 20 }}
                  >
                    -
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </AuthCard>
        </View>
      ))}
    </ScrollView>
  );
}
