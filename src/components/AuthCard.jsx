import { StyleSheet, Text, View } from "react-native";

export default function AuthCard({ title, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 280,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#e5e5e5",
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#888",
    fontSize: 18,
    marginBottom: 10,
  },
});
