import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import AuthCard from "../components/AuthCard";
import BrandLogo from "../components/BrandLogo";
import useStock from "../hooks/useStock";

export default function ViewStock() {
  const { productos, increaseStock, decreaseStock } = useStock();

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      
      <BrandLogo />

      <Text style={{ marginVertical: 10, fontWeight: "bold" }}>
        CONTROL DE STOCK
      </Text>

      {productos.map((item) => (
        <View key={item._id} style={{ marginBottom: 10 }}>
          <AuthCard title={item.nombreProducto}>
            
            <Text>Stock: {item.stock}</Text>

            <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
              
              <TouchableOpacity onPress={() => increaseStock(item)}>
                <Text>+</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => decreaseStock(item)}>
                <Text>-</Text>
              </TouchableOpacity>

            </View>

          </AuthCard>
        </View>
      ))}
    </ScrollView>
  );
}
