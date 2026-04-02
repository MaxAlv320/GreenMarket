import { ScrollView, Text, TouchableOpacity, View } from "react-native";
// Componentes de tu proyecto
import AuthCard from "../components/AuthCard";
import AuthInput from "../components/AuthInput";
import BrandLogo from "../components/BrandLogo";
import { useForm } from "../hooks/useForm";

export default function AddProductView({ navigation }) {
  // Inicializamos el formulario vacío para un nuevo producto
  const { values, handleChange } = useForm({
    name: "",
    price: "",
    description: "",
  });

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F5F5F5", paddingHorizontal: 20 }}
    >
      {/* Header con el Logo del triángulo/carrito */}
      <View style={{ alignItems: "center", marginTop: 40, marginBottom: 20 }}>
        <BrandLogo />
      </View>

      {/* Contenedor tipo tarjeta usando tu AuthCard */}
      <AuthCard title="AGREGAR PRODUCTO">
        {/* Input para el nombre */}
        <AuthInput
          placeholder="Nombre del Producto"
          value={values.name}
          onChangeText={(t) => handleChange("name", t)}
        />

        {/* Input para el precio */}
        <AuthInput
          placeholder="Precio de venta"
          value={values.price}
          onChangeText={(t) => handleChange("price", t)}
          keyboardType="numeric"
        />

        {/* Espacio grande para la descripción como en tu dibujo */}
        <AuthInput
          placeholder="Descripción del nuevo producto..."
          value={values.description}
          onChangeText={(t) => handleChange("description", t)}
          multiline
          style={{ height: 100 }}
        />

        {/* Selector de categorías (las 4 cápsulas grises del boceto) */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginVertical: 15,
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <View
              key={i}
              style={{
                width: "48%",
                height: 25,
                backgroundColor: "#D9D9D9",
                borderRadius: 15,
                marginBottom: 8,
              }}
            />
          ))}
        </View>

        {/* Botones de acción inferiores */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: "48%",
              height: 40,
              backgroundColor: "#888",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#FFF", fontWeight: "bold" }}>CANCELAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // Aquí iría la lógica para guardar el nuevo producto
              navigation.goBack();
            }}
            style={{
              width: "48%",
              height: 40,
              backgroundColor: "#333",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#FFF", fontWeight: "bold" }}>AGREGAR</Text>
          </TouchableOpacity>
        </View>
      </AuthCard>

      {/* Espacio gris decorativo al final de la pantalla */}
      <View
        style={{
          height: 120,
          backgroundColor: "#D9D9D9",
          borderRadius: 15,
          marginTop: 25,
          opacity: 0.5,
        }}
      />
    </ScrollView>
  );
}
