import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Hooks
import useProductForm from "../hooks/useProductForm";
import useStock from "../hooks/useStock";

// Componentes
import StockCard from "../components/StockCard";

export default function ViewStock({ navigation }) {
  const { productos, loading, refetch } = useStock();

  // Hook para eliminar productos
  const { deleteProduct } = useProductForm(() => {
    if (refetch) refetch();
  });

  const confirmDelete = (id, nombre) => {
    Alert.alert(
      "Eliminar Producto",
      `¿Estás seguro de que deseas eliminar "${nombre}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deleteProduct(id),
        },
      ],
    );
  };

  if (loading && productos.length === 0) {
    return (
      <View style={[styles.bg, styles.center]}>
        <ActivityIndicator size="large" color="#BADE7C" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/ImageBackground.jpg")}
      style={styles.bg}
    >
      <View style={styles.overlay}>
        <Text style={styles.brand}>GREEN MARKET</Text>

        <View style={styles.topButtons}>
          <TouchableOpacity
            style={styles.outlineBtn}
            onPress={() => navigation.navigate("AddProduct")}
          >
            <Text style={styles.btnText}>AGREGAR PRODUCTO</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.outlineBtn}
            onPress={() =>
              productos.length > 0 &&
              navigation.navigate("EditProduct", { product: productos[0] })
            }
          >
            <Text style={styles.btnText}>EDITAR PRODUCTO</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subInstruction}>
          Desliza hacia abajo para actualizar la lista
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refetch}
              tintColor="#BADE7C"
              colors={["#BADE7C"]}
            />
          }
        >
          {productos.length === 0 ? (
            <Text style={styles.emptyText}>
              No hay productos. Desliza hacia abajo para recargar.
            </Text>
          ) : (
            productos.map((item) => (
              <TouchableOpacity
                key={item._id}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("EditProduct", { product: item })
                }
              >
                <StockCard
                  item={item}
                  onDelete={() => confirmDelete(item._id, item.nombreProducto)}
                />
              </TouchableOpacity>
            ))
          )}

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.saveText}>VOLVER</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  center: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  brand: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 15,
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 10,
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: "#BADE7C",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  btnText: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  subInstruction: {
    color: "#CCC",
    textAlign: "center",
    fontSize: 12,
    marginBottom: 20,
    fontStyle: "italic",
  },
  emptyText: {
    color: "#FFF",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    opacity: 0.6,
  },
  saveBtn: {
    backgroundColor: "rgba(46, 67, 49, 0.9)",
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#BADE7C",
  },
  saveText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});
