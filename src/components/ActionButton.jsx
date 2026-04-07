import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ActionButton({ label, onPress, color, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: color || "#DEE2C1" }, style]}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  text: { fontWeight: "bold", fontSize: 14, color: "#1A1A1A" },
});
