import { StyleSheet, TextInput } from "react-native";

export default function AuthInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={styles.input}
      placeholderTextColor="#888"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#d6d6d6",
    marginBottom: 12,
    color: "#000",
  },
});
