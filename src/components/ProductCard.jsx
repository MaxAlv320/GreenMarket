import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProductCard({ item, isAdmin, onEdit }) {
  return (
    <View style={styles.card}>
      {/* Barra lateral decorativa */}
      <View
        style={[
          styles.indicator,
          { backgroundColor: item.stock < 10 ? "#FFD700" : "#BADE7C" },
        ]}
      />

      <View style={styles.container}>
        {/* Imagen del producto */}
        <Image
          source={{ uri: item.imagen || "https://via.placeholder.com/150" }}
          style={styles.productImage}
        />

        {/* Información central */}
        <View style={styles.info}>
          <Text style={styles.name}>{item.nombreProducto}</Text>
          <Text style={styles.desc} numberOfLines={2}>
            {item.descripcion || "Sin descripción disponible"}
          </Text>
          <View style={styles.tagRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{item.seccion || "General"}</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: "#DDE6A5" }]}>
              <Text style={styles.tagText}>Food</Text>
            </View>
          </View>
        </View>

        {/* Cuadro de Stock a la derecha */}
        <View style={styles.stockBox}>
          <Text style={styles.stockText}>{item.stock}</Text>
        </View>

        {/* Botón flotante de edición para Admin */}
        {isAdmin && (
          <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
            <MaterialCommunityIcons name="pencil" size={14} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: "row",
    overflow: "hidden",
    elevation: 4,
  },
  indicator: { width: 6 },
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
  },
  productImage: { width: 65, height: 65, resizeMode: "contain" },
  info: { flex: 1, marginLeft: 15 },
  name: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#333",
    textTransform: "uppercase",
  },
  desc: { fontSize: 11, color: "#777", marginVertical: 3 },
  tagRow: { flexDirection: "row", gap: 5 },
  tag: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  tagText: { fontSize: 10, color: "#666", fontWeight: "bold" },
  stockBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
  },
  stockText: { fontSize: 22, fontWeight: "bold", color: "#333" },
  editBtn: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "#617A55",
    padding: 4,
    borderRadius: 10,
  },
});
