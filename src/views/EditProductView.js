import { useEffect } from "react";
import {
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

export default function EditProductView({ route, navigation }) {
  const product = route.params?.product; // Solución al error TypeError

  const { form, loading, error, handleChange, loadProduct, updateProduct } =
    useProductForm(() => navigation.goBack());

  useEffect(() => {
    if (product) loadProduct(product);
  }, [product]);

  if (!product)
    return (
      <View style={styles.bg}>
        <Text style={{ color: "#FFF" }}>Selecciona un producto</Text>
      </View>
    );

  return (
    <ImageBackground
      source={require("../assets/ImageBackground.jpg")}
      style={styles.bg}
    >
      <View style={styles.overlay}>
        <Text style={styles.brandTitle}>GREEN MARKET</Text>
        <ScrollView>
          <View style={styles.mainCard}>
            <View style={styles.banner}>
              <Text style={styles.bannerTitle}>EDIT PRODUCT</Text>
              <Text style={styles.bannerSub}>
                Enter the information of your product
              </Text>
            </View>

            <FormInput
              placeholder="Name"
              value={form.nombreProducto}
              onChangeText={(v) => handleChange("nombreProducto", v)}
            />
            <FormInput
              placeholder="Description"
              multiline
              value={form.descripcion}
              onChangeText={(v) => handleChange("descripcion", v)}
            />
            <FormInput
              placeholder="Productor"
              value={form.productor}
              onChangeText={(v) => handleChange("productor", v)}
            />

            <View style={styles.centerRow}>
              <FormInput
                placeholder="Stock"
                keyboardType="numeric"
                style={styles.halfInput}
                value={String(form.stock)}
                onChangeText={(v) => handleChange("stock", v)}
              />
            </View>
            <View style={styles.centerRow}>
              <FormInput
                placeholder="Price"
                keyboardType="numeric"
                style={[styles.halfInput, { backgroundColor: "#E8F5E9" }]}
                value={String(form.precio)}
                onChangeText={(v) => handleChange("precio", v)}
              />
            </View>

            <Text style={styles.sectionTitle}>Select Category</Text>
            <View style={styles.chipGrid}>
              {["Food", "Cleaning", "Drinks", "Other"].map((cat) => (
                <CategoryChip
                  key={cat}
                  label={cat}
                  isSelected={form.categoria === cat}
                  onPress={() => handleChange("categoria", cat)}
                />
              ))}
            </View>

            <View style={styles.imageBox}>
              <Image
                source={{
                  uri: product.imagen || "https://via.placeholder.com/150",
                }}
                style={styles.img}
                resizeMode="contain"
              />
            </View>

            <View style={styles.actionRow}>
              <ActionButton
                label={loading ? "SAVING..." : "SAVE CHANGES"}
                color="#C5E1A5"
                style={{ width: "48%" }}
                onPress={() => updateProduct(product._id)}
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
  centerRow: { width: "100%", alignItems: "center" },
  halfInput: { width: "45%" },
  sectionTitle: {
    color: "#FFF",
    fontWeight: "bold",
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    width: "65%",
  },
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
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
});
