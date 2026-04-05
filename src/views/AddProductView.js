import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// Hook
import useProductForm from "../hooks/useProductForm";

// Componentes
import AuthCard from "../components/AuthCard";
import AuthInput from "../components/AuthInput";
import BrandLogo from "../components/BrandLogo";

export default function AddProductView({ navigation }) {
  const { form, loading, error, handleChange, addProduct } =
    useProductForm((action, product) => {
      console.log("Producto creado:", product);
      navigation.goBack();
    });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F5F5F5", paddingHorizontal: 20 }}>
      
      {/* Logo */}
      <View style={{ alignItems: "center", marginTop: 40, marginBottom: 20 }}>
        <BrandLogo />
      </View>

      <AuthCard title="AGREGAR PRODUCTO">

        {/* Nombre */}
        <AuthInput
          placeholder="Nombre del Producto"
          value={form.nombreProducto}
          onChangeText={(v) => handleChange("nombreProducto", v)}
        />

        {/* Descripción */}
        <AuthInput
          placeholder="Descripción del producto"
          value={form.descripcion}
          onChangeText={(v) => handleChange("descripcion", v)}
          multiline
          style={{ height: 100 }}
        />

        {/* Precio */}
        <AuthInput
          placeholder="Precio"
          value={form.precio}
          onChangeText={(v) => handleChange("precio", v)}
          keyboardType="numeric"
        />

        {/* Stock */}
        <AuthInput
          placeholder="Stock"
          value={form.stock}
          onChangeText={(v) => handleChange("stock", v)}
          keyboardType="numeric"
        />

        {/* Categoría */}
        <AuthInput
          placeholder="Categoría"
          value={form.categoria}
          onChangeText={(v) => handleChange("categoria", v)}
        />

        {/* Productor */}
        <AuthInput
          placeholder="Productor"
          value={form.productor}
          onChangeText={(v) => handleChange("productor", v)}
        />

        {/* Ubicación */}
        <AuthInput
          placeholder="Ubicación"
          value={form.ubicacion}
          onChangeText={(v) => handleChange("ubicacion", v)}
        />

        {/* Error */}
        {error && (
          <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
        )}

        {/* Botones */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
          }}
        >
          {/* Cancelar */}
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
            <Text style={{ color: "#FFF", fontWeight: "bold" }}>
              CANCELAR
            </Text>
          </TouchableOpacity>

          {/* Agregar */}
          <TouchableOpacity
            onPress={addProduct}
            disabled={loading}
            style={{
              width: "48%",
              height: 40,
              backgroundColor: loading ? "#999" : "#333",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#FFF", fontWeight: "bold" }}>
              {loading ? "AGREGANDO..." : "AGREGAR"}
            </Text>
          </TouchableOpacity>
        </View>

      </AuthCard>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}
