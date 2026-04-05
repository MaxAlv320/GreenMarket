import React from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import AuthCard from "../components/AuthCard";
import BrandLogo from "../components/BrandLogo";

import { useAuthContext } from "../context/authContext";
import useStock from "../hooks/useStock";

export default function MenuView({ navigation }) {
  const { productos, loading, error } = useStock();
  const { isAdmin } = useAuthContext(); 

  //BOTÓN "+" EN HEADER SOLO ADMIN
  React.useLayoutEffect(() => {
    if (isAdmin) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("AddProduct")}
            style={{ marginRight: 15 }}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>＋</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, isAdmin]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5", paddingHorizontal: 20 }}>
      
      {/* LOGO */}
      <View style={{ alignItems: "center", marginTop: 40, marginBottom: 20 }}>
        <BrandLogo />
      </View>

      {/* BUSCADOR */}
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
        <TextInput placeholder="Buscar productos..." />
      </View>

      {/* LISTA */}
      <FlatList
        data={productos}
        keyExtractor={(item) => item._id} // backend usa _id
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <AuthCard title={item.nombreProducto}>
              
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                
                {/* IMAGEN placeholder */}
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: "#FFF",
                  }}
                />

                {/* INFO */}
                <View style={{ flex: 1, marginLeft: 15 }}>
                  <Text>{item.nombreProducto}</Text>
                  <Text style={{ color: "#777" }}>${item.precio}</Text>
                  <Text style={{ color: "#999", fontSize: 12 }}>
                    Stock: {item.stock}
                  </Text>
                </View>

                {/* BOTÓN EDIT SOLO ADMIN */}
                {isAdmin && (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("EditProduct", {
                        product: item,
                      })
                    }
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor: "#666",
                      borderRadius: 6,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#FFF" }}>✎</Text>
                  </TouchableOpacity>
                )}
              </View>

            </AuthCard>
          </View>
        )}
      />
    </View>
  );
}