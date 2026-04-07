import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AlertCard from "../components/AlertCard";
import useAlerts from "../hooks/useAlerts";

export default function ViewAlerts() {
  const { alertas, loading, refetch } = useAlerts();

  if (loading && alertas.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#BADE7C" />
        <Text style={{ color: "#FFF", marginTop: 10 }}>
          Cargando alertas...
        </Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/ImageBackground.jpg")}
      style={styles.bg}
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.brand}>GREEN MARKET</Text>
          <MaterialCommunityIcons name="bell-outline" size={35} color="white" />
          <Text style={styles.subTitle}>
            ALL THE NOTIFICATIONS ABOUT YOUR BUSINESS INVENTORY
          </Text>
          {/* Instrucción visual para el usuario */}
          <Text style={styles.pullInstruction}>
            Desliza hacia abajo para actualizar
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          // CONTROL DE REFRESCO MANUAL
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refetch} // El usuario dispara la recarga aquí
              tintColor="#BADE7C" // iOS
              colors={["#BADE7C"]} // Android
            />
          }
        >
          {alertas.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={80}
                color="#BADE7C"
              />
              <Text style={styles.emptyText}>
                SISTEMA SEGURO{"\n"}No hay productos con bajo stock
              </Text>
              <Text style={styles.emptySubText}>
                Si acabas de vender productos, desliza para refrescar
              </Text>
            </View>
          ) : (
            alertas.map((item) => (
              <AlertCard key={item.id || item._id} item={item} />
            ))
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Un poco más oscuro para legibilidad
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
  },
  header: { alignItems: "center", marginTop: 50, marginBottom: 10 },
  brand: { fontSize: 32, fontWeight: "bold", color: "#FFF", letterSpacing: 2 },
  subTitle: {
    color: "#DDD",
    fontSize: 10,
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 40,
    fontWeight: "bold",
  },
  pullInstruction: {
    color: "#BADE7C",
    fontSize: 11,
    marginTop: 8,
    fontStyle: "italic",
    opacity: 0.8,
  },
  list: { paddingBottom: 100 },
  emptyContainer: { alignItems: "center", marginTop: 50 },
  emptyText: {
    color: "#FFF",
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 22,
  },
  emptySubText: {
    color: "#AAA",
    textAlign: "center",
    fontSize: 12,
    marginTop: 10,
    paddingHorizontal: 30,
  },
});
