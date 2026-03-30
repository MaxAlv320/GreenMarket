import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MenuView from '../views/MenuView';
import ViewAlerts from '../views/ViewAlerts';
import ViewProfile from '../views/ViewProfile';
import ViewStock from '../views/ViewStock';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Menu" component={MenuView} />
      <Tab.Screen name="Stock" component={ViewStock} />
      <Tab.Screen name="Alerts" component={ViewAlerts} />
      <Tab.Screen name="Profile" component={ViewProfile} />
    </Tab.Navigator>
  );
}