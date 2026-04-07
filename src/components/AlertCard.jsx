import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DEFAULT_IMAGE = require("../assets/default-product.png");

export default function AlertCard({ item }) {
  const getColors = () => {
    if (item.stock === 0)
      return { main: "#FF4C4C", icon: "alert-octagon", label: "Crítico" };
    if (item.stock < 10)
      return { main: "#FF9F43", icon: "alert", label: "Bajo" };
    return { main: "#48CAE4", icon: "information", label: "Informativo" };
  };

  const { main, icon } = getColors();

  const imageSource =
    item.imagen && item.imagen.trim() !== ""
      ? { uri: item.imagen }
      : DEFAULT_IMAGE;

  return (
    <View style={styles.container}>
      <View style={[styles.floatingIcon, { backgroundColor: main }]}>
        <MaterialCommunityIcons name={icon} size={24} color="white" />
      </View>

      <View style={styles.card}>
        <View style={styles.content}>
          <Image source={imageSource} style={styles.img} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.alerta}</Text>
          </View>
        </View>

        <View style={[styles.footerBar, { backgroundColor: main }]}>
          <Text style={styles.footerText}>{item.name} Alert</Text>
          <TouchableOpacity style={styles.btnEnterado}>
            <Text style={styles.btnText}>Enterado</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 25, position: "relative" },
  floatingIcon: {
    position: "absolute",
    top: -15,
    right: 10,
    width: 45,
    height: 45,
    borderRadius: 25,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFF",
    elevation: 5,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    overflow: "hidden",
    elevation: 3,
  },
  content: { flexDirection: "row", padding: 15, alignItems: "center" },
  img: { width: 60, height: 60, resizeMode: "contain", borderRadius: 5 },
  textContainer: { flex: 1, marginLeft: 15, paddingRight: 20 },
  name: { fontSize: 16, fontWeight: "bold", color: "#333" },
  description: { fontSize: 12, color: "#666", marginTop: 2 },
  footerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  footerText: { color: "#FFF", fontSize: 12, fontWeight: "bold" },
  btnEnterado: {
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 10,
  },
  btnText: { color: "#FFF", fontSize: 12, fontWeight: "600" },
});
