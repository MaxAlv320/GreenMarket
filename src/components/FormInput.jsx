import { StyleSheet, TextInput } from "react-native";

export default function FormInput({
  placeholder,
  value,
  onChangeText,
  multiline,
  keyboardType,
  style,
}) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      keyboardType={keyboardType}
      placeholderTextColor="#999"
      style={[styles.input, multiline && styles.multiline, style]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFF",
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 38,
    marginBottom: 10,
    textAlign: "center", // Estilo de la imagen
    fontSize: 14,
    color: "#333",
  },
  multiline: { height: 60, textAlignVertical: "top", paddingTop: 10 },
});
