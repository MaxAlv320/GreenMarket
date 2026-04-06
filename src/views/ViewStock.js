import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import StockCard from "../components/StockCard";
import useStock from "../hooks/useStock";

export default function ViewStock({ navigation }) {
  const { productos, increaseStock, decreaseStock, loading } = useStock();

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, backgroundColor: "#1A1A1A" }}
      />
    );

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
          {/* Evitamos el error pasando el primer producto o manejando una selección */}
          <TouchableOpacity
            style={styles.outlineBtn}
            onPress={() =>
              productos[0] &&
              navigation.navigate("EditProduct", { product: productos[0] })
            }
          >
            <Text style={styles.btnText}>EDITAR PRODUCTO</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          {productos.map((item) => (
            <TouchableOpacity
              key={item._id}
              onPress={() =>
                navigation.navigate("EditProduct", { product: item })
              }
            >
              <StockCard
                item={item}
                onIncrease={() => increaseStock(item)}
                onDecrease={() => decreaseStock(item)}
              />
            </TouchableOpacity>
          ))}
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
  },
  btnText: { color: "#FFF", fontSize: 11, fontWeight: "bold" },
});
