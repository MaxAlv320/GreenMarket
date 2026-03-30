import { StyleSheet, View } from "react-native";

export default function AuthFooter() {
  return (
    <View style={styles.container}>
      {/* Contenedor de los puntos (dots) */}
      <View style={styles.dots}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: "center",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "#999",
    borderRadius: 5,
    marginHorizontal: 3,
  },
  line: {
    height: 2,
    backgroundColor: "#bbb",
    width: "80%",
  },
});
