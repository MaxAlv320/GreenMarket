import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

export default function AuthInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  icon,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        placeholderTextColor="#888"
      />
      {/* Icono a la derecha según el diseño final */}
      <MaterialCommunityIcons
        name={icon}
        size={24}
        color="#666"
        style={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 55,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  input: { flex: 1, color: "#000", fontSize: 16 },
  icon: { marginLeft: 10 },
});
