import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function CategoryChip({ label, isSelected, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, isSelected && styles.selectedChip]}
    >
      <Text style={[styles.text, isSelected && styles.selectedText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "#E0E0E0",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
    margin: 4,
    minWidth: 75,
    alignItems: "center",
  },
  selectedChip: {
    backgroundColor: "#BADE7C",
    borderWidth: 1,
    borderColor: "#333",
  },
  text: { fontSize: 11, fontWeight: "bold", color: "#333" },
  selectedText: { color: "#000" },
});
