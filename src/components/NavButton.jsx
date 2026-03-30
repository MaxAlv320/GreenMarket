import { StyleSheet, Text, TouchableOpacity } from "react-native";

/**
 *
 * @param {string} title
 * @param {function} onPress
 */
const NavButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
    backgroundColor: "#333",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  buttonText: {
    color: "#FFFFFF", // Texto blanco
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NavButton;
