import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function AuthFooter() {
  return (
    <View style={styles.socialContainer}>
      <View style={styles.lineRow}>
        <Text style={styles.loginWithText}>login with</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.iconRow}>
        <MaterialCommunityIcons
          name="google"
          size={40}
          color="white"
          style={styles.socialIcon}
        />
        <MaterialCommunityIcons
          name="instagram"
          size={40}
          color="white"
          style={styles.socialIcon}
        />
        <MaterialCommunityIcons
          name="facebook"
          size={40}
          color="white"
          style={styles.socialIcon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  socialContainer: { marginTop: 25, alignItems: "center", width: "100%" },
  lineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },
  loginWithText: { color: "#DDE6A5", fontSize: 14, marginRight: 10 },
  line: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.3)" },
  iconRow: { flexDirection: "row", gap: 20, justifyContent: "center" },
  socialIcon: { opacity: 0.9 },
});
