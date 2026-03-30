import { FlatList, TextInput, TouchableOpacity, View } from "react-native";
import AuthCard from "../components/AuthCard";
import BrandLogo from "../components/BrandLogo";
import { products } from "../helpers/mockData";

export default function MenuView() {
  return (
    <View
      style={{ flex: 1, backgroundColor: "#F5F5F5", paddingHorizontal: 20 }}
    >
      <View style={{ alignItems: "center", marginTop: 40, marginBottom: 20 }}>
        <BrandLogo />
      </View>

      <View
        style={{
          backgroundColor: "#D9D9D9",
          borderRadius: 25,
          height: 45,
          paddingHorizontal: 20,
          marginBottom: 15,
          justifyContent: "center",
        }}
      >
        <TextInput placeholder="Search products..." />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <View
            key={i}
            style={{
              width: "22%",
              height: 25,
              backgroundColor: "#D9D9D9",
              borderRadius: 15,
            }}
          />
        ))}
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <AuthCard title={item.name}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: "#FFF",
                  }}
                />
                <View style={{ flex: 1, marginLeft: 15 }}>
                  <View
                    style={{
                      height: 4,
                      backgroundColor: "#BBB",
                      borderRadius: 2,
                      marginBottom: 6,
                      width: "90%",
                    }}
                  />
                  <View
                    style={{
                      height: 4,
                      backgroundColor: "#BBB",
                      borderRadius: 2,
                      width: "60%",
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    width: 35,
                    height: 35,
                    backgroundColor: "#666",
                    borderRadius: 6,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{ width: 15, height: 3, backgroundColor: "#FFF" }}
                  />
                </TouchableOpacity>
              </View>
            </AuthCard>
          </View>
        )}
      />
    </View>
  );
}
