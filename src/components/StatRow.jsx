import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// 1. Definir la función
function StatRow({ label, value }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.labelText}>
        {label} {value !== undefined ? `: ${value}` : ""}
      </Text>
      <MaterialCommunityIcons name="chevron-down" size={20} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.15)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  labelText: { color: "#FFF", fontSize: 11, fontWeight: "bold" },
});

// 2. CRÍTICO: Asegúrate de que esta línea esté presente
export default StatRow;
