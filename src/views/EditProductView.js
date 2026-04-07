import { useEffect } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ActionButton from "../components/ActionButton";
import CategoryChip from "../components/CategoryChip";
import FormInput from "../components/FormInput";
import useProductForm from "../hooks/useProductForm";

const DEFAULT_IMAGE = require("../assets/default-product.png");

export default function EditProductView({ route, navigation }) {
  const product = route.params?.product;

  const { form, loading, error, handleChange, loadProduct, updateProduct } =
    useProductForm(() => {
      Alert.alert("Éxito", "Producto actualizado correctamente");
      navigation.goBack();
    });

  useEffect(() => {
    if (product) loadProduct(product);
  }, [product]);

  const handleSave = async () => {
    await updateProduct(product);
  };

  if (!product) return null;

  const imageSource =
    product.imagen && product.imagen.trim() !== ""
      ? { uri: product.imagen }
      : DEFAULT_IMAGE;

  return (
    <ImageBackground
      source={require("../assets/ImageBackground.jpg")}
      style={styles.bg}
    >
      <View style={styles.overlay}>
        <Text style={styles.brandTitle}>GREEN MARKET</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainCard}>
            <View style={styles.banner}>
              <Text style={styles.bannerTitle}>EDIT PRODUCT</Text>
              <Text style={styles.bannerSub}>
                Unicamente puedes editar Precio y Stock
              </Text>
            </View>

            <FormInput
              placeholder="Name"
              value={form.nombreProducto}
              editable={false}
              style={styles.disabledInput}
            />

            <FormInput
              placeholder="Description"
              multiline
              value={form.descripcion}
              editable={false}
              style={styles.disabledInput}
            />

            <View style={styles.centerRow}>
              <Text style={styles.label}>STOCK DISPONIBLE</Text>
              <FormInput
                placeholder="Stock"
                keyboardType="numeric"
                style={styles.halfInput}
                value={form.stock}
                onChangeText={(v) => handleChange("stock", v)}
              />
            </View>

            <View style={styles.centerRow}>
              <Text style={styles.label}>PRECIO UNITARIO</Text>
              <FormInput
                placeholder="Price"
                keyboardType="numeric"
                style={[styles.halfInput, { backgroundColor: "#E8F5E9" }]}
                value={form.precio}
                onChangeText={(v) => handleChange("precio", v)}
              />
            </View>

            <Text style={styles.sectionTitle}>Category</Text>
            <View style={styles.chipGrid}>
              <CategoryChip
                label={form.categoria}
                isSelected={true}
                onPress={() => {}}
              />
            </View>

            <View style={styles.imageBox}>
              <Image
                source={imageSource}
                style={styles.img}
                resizeMode="contain"
              />
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <View style={styles.actionRow}>
              <ActionButton
                label={loading ? "SAVING..." : "SAVE CHANGES"}
                color="#C5E1A5"
                style={{ width: "48%" }}
                onPress={handleSave}
              />
              <ActionButton
                label="DISCARD"
                color="#DEE2C1"
                style={{ width: "48%" }}
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 15,
  },
  mainCard: {
    backgroundColor: "#7A8D74",
    borderRadius: 25,
    padding: 20,
    marginBottom: 40,
  },
  banner: {
    backgroundColor: "#DEE2C1",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  bannerTitle: { fontSize: 20, fontWeight: "bold" },
  bannerSub: { fontSize: 11 },
  centerRow: { width: "100%", alignItems: "center", marginBottom: 10 },
  label: { color: "#FFF", fontSize: 10, fontWeight: "bold", marginBottom: 5 },
  halfInput: { width: "60%", textAlign: "center" },
  disabledInput: { backgroundColor: "#f0f0f0", opacity: 0.7 },
  sectionTitle: {
    color: "#FFF",
    fontWeight: "bold",
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    width: "40%",
    alignSelf: "center",
    textAlign: "center",
  },
  chipGrid: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  imageBox: {
    backgroundColor: "#FFF",
    height: 120,
    borderRadius: 25,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  img: { width: "70%", height: "70%" },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  errorText: {
    color: "#FFCDD2",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
});
