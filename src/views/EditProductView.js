import { useEffect } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import useProductForm from "../hooks/useProductForm";

// Componentes
import AuthCard from "../components/AuthCard";
import AuthInput from "../components/AuthInput";
import BrandLogo from "../components/BrandLogo";

export default function EditProductView({ route, navigation }) {
  const { product } = route.params;

  const {
    form,
    loading,
    error,
    handleChange,
    loadProduct,
    updateProduct,
    deleteProduct,
  } = useProductForm(() => {
    navigation.goBack();
  });

  // Precargar datos
  useEffect(() => {
    loadProduct(product);
  }, [product]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F5F5F5", paddingHorizontal: 20 }}>
      
      {/* Logo */}
      <View style={{ alignItems: "center", marginTop: 40, marginBottom: 20 }}>
        <BrandLogo />
      </View>

      <AuthCard title="EDITAR DETALLES">

        {/* Nombre */}
        <AuthInput
          placeholder="Nombre del producto"
          value={form.nombreProducto}
          onChangeText={(v) => handleChange("nombreProducto", v)}
        />

        {/* Descripción */}
        <AuthInput
          placeholder="Descripción"
          value={form.descripcion}
          onChangeText={(v) => handleChange("descripcion", v)}
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
        {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}

        {/* Botones */}
        <View style={{ marginTop: 15 }}>
          <Button
            title={loading ? "Guardando..." : "Guardar cambios"}
            onPress={() => updateProduct(product.id)}
            disabled={loading}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Button
            title="Eliminar producto"
            onPress={() => deleteProduct(product.id)}
            disabled={loading}
            color="red"
          />
        </View>

      </AuthCard>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}