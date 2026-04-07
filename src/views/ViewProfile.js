import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuthContext } from "../context/authContext";
import { useProfile } from "../hooks/useProfile";

export default function ViewProfile() {
  const { logout } = useAuthContext();

  const {
    nombreNegocio,
    descripcion,
    umbralStockBajo,
    umbralStockMedio,
    form,
    handleChange,
    savePerfil,
    loading,
    error,
  } = useProfile();

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    const success = await savePerfil();
    if (success) setIsEditing(false);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3A5A40" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/ImageBackground.jpg")}
      style={styles.bg}
    >
      <View style={styles.overlay}>
        
        {/* 🔹 HEADER ORIGINAL */}
        <Text style={styles.topBrand}>GREEN MARKET</Text>

        <View style={styles.profileHeader}>
          <View style={styles.avatarCircle}>
            <MaterialCommunityIcons
              name="cart-check"
              size={35}
              color="#3A5A40"
            />
          </View>

          <View style={styles.profileText}>
            <Text style={styles.aboutText}>About...</Text>
          </View>

          <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.card}>

          {/*Nombre */}
          {isEditing ? (
            <TextInput
              style={styles.inputName}
              value={form.nombreNegocio}
              onChangeText={(text) =>
                handleChange("nombreNegocio", text)
              }
              placeholder="Nombre del negocio"
              placeholderTextColor="#ccc"
            />
          ) : (
            <Text style={styles.title}>
              {nombreNegocio || "Abarrotes LETY"}
            </Text>
          )}

          {/* Umbrales */}
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Umbral de Stock Bajo: {umbralStockBajo} unidades
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Umbral de Stock Medio: {umbralStockMedio} unidades
            </Text>
          </View>

          {/* Descripción */}
          {isEditing ? (
            <TextInput
              style={styles.inputDesc}
              value={form.descripcion}
              onChangeText={(text) =>
                handleChange("descripcion", text)
              }
              placeholder="Descripción"
              placeholderTextColor="#ccc"
              multiline
            />
          ) : (
            <View style={styles.descBox}>
              <Text style={styles.descText}>
                {descripcion ||
                  "Pequeño abarrotes familiar con más de 8 años de servicio en la colonia..."}
              </Text>
            </View>
          )}

          {/* BOTÓN */}
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
          >
            <Text style={styles.editText}>
              {isEditing ? "SAVE" : "EDIT INFORMATION"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutTxt}>LOG OUT</Text>
        </TouchableOpacity>

        {/* ERROR */}
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 25,
    paddingTop: 50,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
  },

  topBrand: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 25,
  },

  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },

  profileText: {
    flex: 1,
    marginLeft: 15,
  },

  aboutText: {
    fontSize: 12,
    color: "#DDD",
  },

  // 🔥 CARD
  card: {
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginBottom: 30,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 15,
  },

  infoBox: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  infoText: {
    color: "#DDD",
    fontSize: 12,
  },

  descBox: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  descText: {
    color: "#CCC",
    fontSize: 12,
    lineHeight: 18,
  },

  editBtn: {
    marginTop: 20,
    backgroundColor: "#D9D9D9",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },

  editText: {
    fontWeight: "bold",
    color: "#333",
  },

  logoutBtn: {
    backgroundColor: "#E53935",
    paddingVertical: 14,
    borderRadius: 25,
    width: "70%",
    alignSelf: "center",
  },

  logoutTxt: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },

  inputName: {
    color: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    marginBottom: 10,
    textAlign: "center",
  },

  inputDesc: {
    color: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#AAA",
    marginTop: 10,
  },

  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});
