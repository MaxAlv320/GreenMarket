import { StyleSheet, Text, View } from "react-native";

const BrandLogo = () => {
  return (
    <View style={styles.brandingContainer}>
      {/* El Triángulo */}
      <View style={styles.triangle} />

      {/* El Texto de la Marca */}
      <Text style={styles.brandNameText}>Green Market</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  brandingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15, // Espacio entre triángulo y texto
    marginBottom: 30,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 30,
    borderRightWidth: 30,
    borderBottomWidth: 50,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#666",
  },
  brandNameText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    letterSpacing: 0.5,
  },
});

export default BrandLogo;
