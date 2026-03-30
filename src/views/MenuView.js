import { FlatList, Text, View } from 'react-native';
import { products } from '../helpers/mockData';

export default function MenuView() {
  return (
    <View>
      <Text>Productos</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} - ${item.price}</Text>
        )}
      />
    </View>
  );
}