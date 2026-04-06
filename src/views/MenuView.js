//Se cambian parametros debido a que se modifico el useStock
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
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

const SECTIONS = ["section 7", "food", "drinks", "section 5"];

export default function MenuView({ navigation }) {
  const { productos, loading } = useStock();
  const { isAdmin } = useAuthContext();

  if (loading) {
    return (
      <View
        style={[
          styles.fullScreen,
          { justifyContent: "center", backgroundColor: "#1A1A1A" },
        ]}
      >
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

        <View style={styles.searchBox}>
          <MaterialCommunityIcons name="magnify" size={22} color="#999" />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>

        <View style={styles.chipRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {SECTIONS.map((item, idx) => (
              <View key={idx} style={styles.chipItem}>
                <Text style={styles.chipText}>{item}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.arrowBtn}>
              <MaterialCommunityIcons
                name="chevron-down"
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </ScrollView>
        </View>

        <FlatList
          data={productos}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              isAdmin={isAdmin}
              onEdit={() =>
                navigation.navigate("EditProduct", { product: item })
              }
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />

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
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  chipText: { color: "#FFF", fontSize: 12, fontWeight: "500" },
  arrowBtn: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
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
  },
});
