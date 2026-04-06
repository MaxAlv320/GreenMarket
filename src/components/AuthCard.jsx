import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // <--- Solución al error de undefined
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AuthCard({ children, title, subTitle, showBack }) {
  const navigation = useNavigation(); // <--- Obtiene la navegación automáticamente

  return (
    <View style={styles.card}>
      {/* Sección Superior: Crema */}
      <View style={styles.topSection}>
        {showBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="undo-variant"
              size={28}
              color="#2F4F4F"
            />
          </TouchableOpacity>
        )}
        <Text style={styles.titleText}>{title || "Hello, Welcome!"}</Text>
        <Text style={styles.subtext}>
          {subTitle || "Don't have an account?"}
        </Text>

        {!showBack && (
          <TouchableOpacity
            style={styles.registerBadge}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.registerBtnText}>Register</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Sección Inferior: Verde Oliva */}
      <View style={styles.bottomSection}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 40,
    overflow: "hidden",
    backgroundColor: "#617A55",
    width: "100%",
    elevation: 10,
  },
  topSection: {
    backgroundColor: "#DDE6A5",
    paddingVertical: 30,
    alignItems: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    zIndex: 1,
  },
  backButton: { position: "absolute", left: 20, top: 30 },
  titleText: { fontSize: 28, fontWeight: "bold", color: "#2F4F4F" },
  subtext: { color: "#555", marginTop: 5 },
  registerBadge: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#2F4F4F",
    paddingHorizontal: 25,
    paddingVertical: 4,
    borderRadius: 12,
  },
  registerBtnText: { fontWeight: "600", color: "#2F4F4F" },
  bottomSection: { padding: 25, paddingTop: 35 },
});
