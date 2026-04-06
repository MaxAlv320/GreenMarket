import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Hooks
import ActionButton from "../components/ActionButton";
import CategoryChip from "../components/CategoryChip";
import FormInput from "../components/FormInput";
import useProductForm from "../hooks/useProductForm";

const CATEGORIES = [
  "Food",
  "Cleaning",
  "Clothing",
  "Drinks",
  "Tools",
  "Sports",
  "Health",
  "Electronics",
  "Other",
];

export default function AddProductView({ navigation }) {
  const { form, loading, error, handleChange, addProduct } = useProductForm(
    (action, product) => {
      navigation.goBack();
    },
  );

  return (
    <ImageBackground
      source={require("../assets/ImageBackground.jpg")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.brandTitle}>GREEN MARKET</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainCard}>
            <View style={styles.banner}>
              <Text style={styles.bannerTitle}>ADD PRODUCT</Text>
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
            <FormInput
              placeholder="Ubication"
              value={form.ubicacion}
              onChangeText={(v) => handleChange("ubicacion", v)}
            />

            <View style={styles.smallInputRow}>
              <FormInput
                placeholder="Stock"
                keyboardType="numeric"
                style={styles.halfInput}
                value={form.stock}
                onChangeText={(v) => handleChange("stock", v)}
              />
            </View>
            <View style={styles.smallInputRow}>
              <FormInput
                placeholder="Price"
                keyboardType="numeric"
                style={[styles.halfInput, { backgroundColor: "#E8F5E9" }]}
                value={form.precio}
                onChangeText={(v) => handleChange("precio", v)}
              />
            </View>

            <Text style={styles.sectionTitle}>Select Category</Text>
            <View style={styles.chipGrid}>
              {CATEGORIES.map((cat) => (
                <CategoryChip
                  key={cat}
                  label={cat}
                  isSelected={form.categoria === cat}
                  onPress={() => handleChange("categoria", cat)}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.uploadArea}>
              <MaterialCommunityIcons
                name="image-plus"
                size={50}
                color="#7A8D74"
              />
            </TouchableOpacity>

            <View style={styles.actionRow}>
              <ActionButton
                label={loading ? "SAVING..." : "SAVE"}
                color="#C5E1A5"
                style={{ width: "48%" }}
                onPress={addProduct}
              />
              <ActionButton
                label="DISCARD"
                color="#DEE2C1"
                style={{ width: "48%" }}
                onPress={() => navigation.goBack()}
              />
            </View>

            {error && <Text style={styles.error}>{error}</Text>}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
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
    marginBottom: 50,
  },
  banner: {
    backgroundColor: "#DEE2C1",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  bannerTitle: { fontSize: 20, fontWeight: "bold", color: "#1A1A1A" },
  bannerSub: { fontSize: 11, color: "#4A4A4A" },
  smallInputRow: { width: "100%", alignItems: "center" },
  halfInput: { width: "45%" },
  sectionTitle: {
    color: "#FFF",
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    width: "65%",
  },
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  uploadArea: {
    backgroundColor: "#C4C4C4",
    height: 110,
    borderRadius: 30,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  error: {
    color: "#FFEB3B",
    textAlign: "center",
    marginTop: 15,
    fontWeight: "bold",
  },
});
