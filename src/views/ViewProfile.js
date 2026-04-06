import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import StatRow from "../components/StatRow";
import { useAuthContext } from "../context/authContext";
import { useProfile } from "../hooks/useProfile";

export default function ViewProfile() {
  const { logout } = useAuthContext();
  const {
    nombreNegocio,
    descripcion,
    umbralStockBajo,
    umbralStockMedio,
    productos,
  } = useProfile();

  const bajo = productos.filter((p) => p.stock < umbralStockBajo).length;
  const medio = productos.filter(
    (p) => p.stock >= umbralStockBajo && p.stock < umbralStockMedio,
  ).length;
  const alto = productos.filter((p) => p.stock >= umbralStockMedio).length;

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
              name="cart-check"
              size={35}
              color="#3A5A40"
            />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.bizName}>
              {nombreNegocio || "Abarrotes LETY"}
            </Text>
            <Text style={styles.bizDesc}>
              {descripcion || "INVENTORY MANAGEMENT AND STATISTICS"}
            </Text>
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.statsBox}>
          <Text style={styles.statsTitle}>STATS</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <StatRow
              label="TIENES PRODUCTOS DIFERENTES"
              value={productos.length}
            />
            <StatRow label="PRODUCTOS CON INVENTARIO BAJO" value={bajo} />
            <StatRow label="PRODUCTOS CON INVENTARIO MEDIO" value={medio} />
            <StatRow label="PRODUCTOS CON INVENTARIO ALTO" value={alto} />
            <StatRow label="GRAFICAS" />
          </ScrollView>
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
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 25,
    paddingTop: 50,
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
    marginBottom: 30,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: { flex: 1, marginLeft: 15 },
  bizName: { fontSize: 18, fontWeight: "bold", color: "#FFF" },
  bizDesc: { fontSize: 9, color: "#DDD", marginTop: 2 },
  statsBox: {
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 20,
    flex: 0.75,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 4,
  },
  logoutBtn: {
    backgroundColor: "#C83232",
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 25,
    width: "70%",
    alignSelf: "center",
  },
  logoutTxt: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
