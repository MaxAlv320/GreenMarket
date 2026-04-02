import { ScrollView, Text, TouchableOpacity, View } from "react-native";
// Importamos tus componentes globales
import AuthCard from "../components/AuthCard";
import AuthInput from "../components/AuthInput";
import BrandLogo from "../components/BrandLogo";
import { useForm } from "../hooks/useForm";

export default function EditProductView({ route, navigation }) {
  // Recibimos los datos del producto a editar
  const { product } = route.params;

  const { values, handleChange } = useForm({
    name: product?.name || "",
    price: product?.price?.toString() || "",
    description: product?.description || "",
  });

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F5F5F5", paddingHorizontal: 20 }}
    >
      <View style={{ alignItems: "center", marginTop: 40, marginBottom: 20 }}>
        <BrandLogo />
      </View>

      <AuthCard title="EDITAR DETALLES">
        <AuthInput
          placeholder="Nombre del producto"
          value={values.name}
          onChangeText={(t) => handleChange("name", t)}
        />

        <AuthInput
          placeholder="Precio"
          value={values.price}
          onChangeText={(t) => handleChange("price", t)}
          keyboardType="numeric"
        />

        <AuthInput
          placeholder="Descripción del producto..."
          value={values.description}
          onChangeText={(t) => handleChange("description", t)}
          multiline
          style={{ height: 100 }}
        />

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginVertical: 15,
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <View
              key={i}
              style={{
                width: "23%",
                height: 20,
                backgroundColor: "#D9D9D9",
                borderRadius: 10,
                marginBottom: 8,
              }}
            />
          ))}
        </View>

        <View
          style={{
            height: 120,
            backgroundColor: "#BBB",
            borderRadius: 15,
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#666", fontSize: 12 }}>
            TAP PARA CAMBIAR IMAGEN
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            height: 45,
            backgroundColor: "#333",
            borderRadius: 22,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#FFF", fontWeight: "bold" }}>
            GUARDAR CAMBIOS
          </Text>
        </TouchableOpacity>
      </AuthCard>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}
