import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function AuthButton({ text, onPress, loading }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={styles.button}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#2F4F4F" />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 25,
    backgroundColor: "#BADE7C", // Verde Lima
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: "#2F4F4F",
    fontWeight: "bold",
    fontSize: 18,
  },
});
