import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import ProductCard from "../components/ProductCard";
import { useAuthContext } from "../context/authContext";
import useStock from "../hooks/useStock";

const SECTIONS = ["all", "food", "drinks", "cleaning", "other"];

export default function MenuView({ navigation }) {
  const { productos, loading, refetch } = useStock();
  const { isAdmin } = useAuthContext();

  // Estados para búsqueda y filtrado
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Filtro lógico de productos (Nombre + Categoría)
  const filteredProducts = useMemo(() => {
    return productos.filter((p) => {
      const matchSearch = p.nombreProducto
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchCategory =
        activeCategory === "all" ||
        p.categoria?.toLowerCase() === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [search, activeCategory, productos]);

  if (loading && productos.length === 0) {
    return (
      <View style={[styles.fullScreen, styles.center]}>
        <ActivityIndicator size="large" color="#BADE7C" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/ImageBackground.jpg")}
      style={styles.fullScreen}
    >
      <View style={styles.mainOverlay}>
        <Text style={styles.titleStyle}>GREEN MARKET</Text>

        {/* Buscador */}
        <View style={styles.searchBox}>
          <MaterialCommunityIcons name="magnify" size={22} color="#999" />
          <TextInput
            placeholder="Search products..."
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Chips de Categorías */}
        <View style={styles.chipRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {SECTIONS.map((cat, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.chipItem,
                  activeCategory === cat && styles.chipActive,
                ]}
                onPress={() => setActiveCategory(cat)}
              >
                <Text style={styles.chipText}>{cat.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Lista de Productos */}
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              isAdmin={isAdmin}
              // Pasamos el objeto 'product' completo para evitar el error de undefined
              onEdit={() =>
                navigation.navigate("EditProduct", { product: item })
              }
            />
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refetch}
              tintColor="#FFF"
            />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No products found</Text>
          }
        />

        {/* Botón Flotante para Admin */}
        {isAdmin && (
          <TouchableOpacity
            style={styles.floatBtn}
            onPress={() => navigation.navigate("AddProduct")}
          >
            <MaterialCommunityIcons name="plus" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fullScreen: { flex: 1 },
  center: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
  },
  mainOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  titleStyle: {
    fontSize: 34,
    fontWeight: "900",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 1,
  },
  searchBox: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15 },
  chipRow: { marginBottom: 20 },
  chipItem: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
  chipActive: {
    backgroundColor: "#BADE7C",
    borderColor: "#BADE7C",
  },
  chipText: { color: "#FFF", fontSize: 11, fontWeight: "bold" },
  listContent: { paddingBottom: 100 },
  emptyText: {
    color: "#FFF",
    textAlign: "center",
    marginTop: 50,
    opacity: 0.7,
  },
  floatBtn: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#617A55",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
