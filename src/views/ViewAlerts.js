import { ScrollView, Text, View } from "react-native";
import AuthCard from "../components/AuthCard";
import BrandLogo from "../components/BrandLogo";
import useAlerts from "../hooks/useAlerts";

export default function ViewAlerts() {
  const { alertas, loading, error } = useAlerts();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cargando alertas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      
      {/* Logo */}
      <BrandLogo />

      {/* Estado general */}
      <View style={{ marginVertical: 15 }}>
        <Text style={{ fontWeight: "bold" }}>
          {alertas.length === 0
            ? "SISTEMA SEGURO"
            : "ATENCIÓN REQUERIDA"}
        </Text>
      </View>

      {/* Lista de alertas */}
      {alertas.length === 0 ? (
        <Text>No hay productos con bajo stock</Text>
      ) : (
        alertas.map((item) => (
          <View key={item.id} style={{ marginBottom: 10 }}>
            <AuthCard title={item.name}>
              
              <Text>{item.alerta}</Text>

            </AuthCard>
          </View>
        ))
      )}

    </ScrollView>
  );
}