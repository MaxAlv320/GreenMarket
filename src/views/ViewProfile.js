import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuthContext } from "../context/authContext";
import { useProfile } from "../hooks/useProfile";

export default function ViewProfile() {
  const { logout, user } = useAuthContext();
  const { nombreNegocio, descripcion } = useProfile();

  return (
    <ImageBackground
      source={require("../assets/ImageBackground.jpg")}
      style={styles.bg}
    >
      <View style={styles.overlay}>
        <Text style={styles.topBrand}>GREEN MARKET</Text>

        <View style={styles.profileHeader}>
          <View style={styles.avatarCircle}>
            <MaterialCommunityIcons
              name="cart-variant"
              size={35}
              color="#3A5A40"
            />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.bizName}>
              {nombreNegocio || "Abarrotes LETY"}
            </Text>
            <Text style={styles.bizDesc}>{descripcion || "About"}</Text>
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Information</Text>

          <View style={styles.inputStatic}>
            <Text style={styles.inputText}>
              {user?.email || "correo@gmail.com"}
            </Text>
          </View>

          <View style={styles.inputStatic}>
            <Text style={styles.inputText}>
              {user?.username || "Usuario Lety"}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutTxt}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 25,
    paddingTop: 50,
  },
  topBrand: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 30,
    letterSpacing: 1,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  profileText: { flex: 1, marginLeft: 15 },
  bizName: { fontSize: 22, fontWeight: "bold", color: "#FFF" },
  bizDesc: { fontSize: 14, color: "#DDD", marginTop: 2 },

  infoBox: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 25,
    height: 250,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 25,
    letterSpacing: 5,
  },
  inputStatic: {
    backgroundColor: "rgba(255,255,255,0.15)",
    width: "100%",
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  inputText: {
    color: "#EEE",
    fontSize: 14,
    textAlign: "center",
  },

  logoutBtn: {
    backgroundColor: "#C62828",
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: "auto",
    marginBottom: 40,
    width: "80%",
    alignSelf: "center",
  },
  logoutTxt: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    letterSpacing: 1,
  },
});
