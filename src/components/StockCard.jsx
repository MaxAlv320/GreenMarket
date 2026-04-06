import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function StockCard({ item, onIncrease, onDecrease }) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.mainInfo}>
        <Image source={{ uri: item.imagen }} style={styles.img} />
        <View style={styles.details}>
          <Text style={styles.name}>{item.nombreProducto}</Text>
          <Text style={styles.desc} numberOfLines={2}>
            {item.descripcion}
          </Text>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Section 7</Text>
            </View>
            <View style={[styles.badge, styles.badgeGreen]}>
              <Text style={styles.badgeText}>Food</Text>
            </View>
          </View>
        </View>
        <View style={styles.stockDisplay}>
          <Text style={styles.stockNum}>{item.stock}</Text>
        </View>
      </View>

      {/* Barra de controles inferior */}
      <View
        style={[
          styles.controlBar,
          { backgroundColor: item.stock < 10 ? "#C8A2C8" : "#E6EE9C" },
        ]}
      >
        <Text style={styles.controlText}>AGREGAR O QUITAR PRODUCTO</Text>
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.circleBtn} onPress={onDecrease}>
            <MaterialCommunityIcons name="minus" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.circleBtn, styles.btnPlus]}
            onPress={onIncrease}
          >
            <MaterialCommunityIcons name="plus" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 4,
  },
  mainInfo: { flexDirection: "row", padding: 12, alignItems: "center" },
  img: { width: 55, height: 55, resizeMode: "contain" },
  details: { flex: 1, marginLeft: 12 },
  name: { fontWeight: "bold", fontSize: 14, color: "#333" },
  desc: { fontSize: 10, color: "#777" },
  badgeRow: { flexDirection: "row", gap: 5, marginTop: 5 },
  badge: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeGreen: { backgroundColor: "#DDE6A5" },
  badgeText: { fontSize: 9, fontWeight: "bold" },
  stockDisplay: {
    width: 55,
    height: 55,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
  },
  stockNum: { fontSize: 18, fontWeight: "bold" },
  controlBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  controlText: { fontSize: 10, fontWeight: "bold", color: "#444" },
  btnRow: { flexDirection: "row", gap: 10 },
  circleBtn: {
    backgroundColor: "#B71C1C",
    width: 30,
    height: 22,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnPlus: { backgroundColor: "#2E7D32" },
});
