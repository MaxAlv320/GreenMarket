import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function StockCard({ item, onDelete }) {
  // Color dinámico según el stock: Púrpura si es bajo (<10), Verde si es normal
  const statusColor = item.stock < 10 ? "#C8A2C8" : "#DDE6A5";

  return (
    <View style={styles.cardContainer}>
      <View style={styles.mainInfo}>
        <Image source={{ uri: item.imagen }} style={styles.img} />

        <View style={styles.details}>
          <Text style={styles.name}>{item.nombreProducto?.toUpperCase()}</Text>
          <Text style={styles.desc} numberOfLines={2}>
            {item.descripcion}
          </Text>

          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {item.ubicacion || "Section 7"}
              </Text>
            </View>
            <View style={[styles.badge, styles.badgeGreen]}>
              <Text style={styles.badgeText}>{item.categoria || "Food"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.stockDisplay}>
          <Text style={styles.stockNum}>{item.stock}</Text>
        </View>
      </View>

      {/* Barra de controles inferior refactorizada */}
      <View style={[styles.controlBar, { backgroundColor: statusColor }]}>
        <Text style={styles.controlText}>ELIMINAR PRODUCTO DEL INVENTARIO</Text>

        <View style={styles.btnRow}>
          {/* Botón único de eliminar usando la papelera */}
          <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={18}
              color="white"
            />
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mainInfo: { flexDirection: "row", padding: 12, alignItems: "center" },
  img: { width: 55, height: 55, resizeMode: "contain" },
  details: { flex: 1, marginLeft: 12 },
  name: { fontWeight: "bold", fontSize: 14, color: "#333" },
  desc: { fontSize: 10, color: "#777", marginTop: 2 },
  badgeRow: { flexDirection: "row", gap: 5, marginTop: 8 },
  badge: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeGreen: { backgroundColor: "#DDE6A5" },
  badgeText: { fontSize: 9, fontWeight: "bold", color: "#444" },
  stockDisplay: {
    width: 55,
    height: 55,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  stockNum: { fontSize: 18, fontWeight: "bold", color: "#333" },
  controlBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  controlText: { fontSize: 9, fontWeight: "bold", color: "#333" },
  btnRow: { flexDirection: "row", alignItems: "center" },
  deleteBtn: {
    backgroundColor: "#B71C1C", // Rojo para eliminar
    width: 35,
    height: 24,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
