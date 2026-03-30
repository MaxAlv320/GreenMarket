import { Button, Text, View } from 'react-native';
import { useStock } from '../hooks/useStock';

export default function ViewStock() {
  const { items, increaseStock, decreaseStock } = useStock();

  return (
    <View>
      <Text>Stock</Text>

      {items.map(item => (
        <View key={item.id}>
          <Text>{item.name} - Stock: {item.stock}</Text>
          <Button title="+" onPress={() => increaseStock(item.id)} />
          <Button title="-" onPress={() => decreaseStock(item.id)} />
        </View>
      ))}
    </View>
  );
}