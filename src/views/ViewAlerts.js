import { Text, View } from 'react-native';
import { useAlerts } from '../hooks/useAlerts';

export default function ViewAlerts() {
  const { alerts } = useAlerts();

  return (
    <View>
      <Text>Alertas</Text>

      {alerts.length === 0 ? (
        <Text>Todo en buen estado ✅</Text>
      ) : (
        alerts.map((alert, index) => (
          <Text key={index}>{alert}</Text>
        ))
      )}
    </View>
  );
}