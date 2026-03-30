import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useProfile } from "../hooks/useProfile";

import AuthCard from "../components/AuthCard";
import AuthInput from "../components/AuthInput";

export default function ViewProfile() {
  const { name, email, branch, setName, setEmail, setBranch, saveProfile } =
    useProfile();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 30,
          backgroundColor: "#FFF",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "#888",
          }}
        />

        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "#333" }}>
            {name || "Usuario"}
          </Text>
          <View
            style={{
              height: 4,
              backgroundColor: "#D9D9D9",
              borderRadius: 2,
              width: 100,
              marginTop: 5,
            }}
          />
        </View>
      </View>

      <AuthCard title="DATOS DEL PERFIL">
        <View style={{ gap: 15, marginTop: 10 }}>
          <AuthInput
            placeholder="Nombre Completo"
            value={name}
            onChangeText={setName}
          />

          <AuthInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <AuthInput
            placeholder="Sucursal"
            value={branch}
            onChangeText={setBranch}
          />
          <TouchableOpacity
            onPress={saveProfile}
            style={{
              backgroundColor: "#333",
              padding: 12,
              borderRadius: 25,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#FFF", fontWeight: "bold" }}>
              GUARDAR CAMBIOS
            </Text>
          </TouchableOpacity>
        </View>
      </AuthCard>
      <View
        style={{
          height: 150,
          backgroundColor: "#D9D9D9",
          marginHorizontal: 30,
          marginTop: 20,
          borderRadius: 15,
          opacity: 0.5,
        }}
      />
    </ScrollView>
  );
}
