import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MenuView from './MenuView';
import ViewAlerts from './ViewAlerts';
import ViewProfile from './ViewProfile';
import ViewStock from './ViewStock';

import { useAuthContext } from '../context/authContext';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { isAdmin } = useAuthContext();

  return (
    <Tab.Navigator>

      <Tab.Screen name="Menu" component={MenuView} />
      <Tab.Screen name="Alerts" component={ViewAlerts} />
      
      {/* SOLO ADMIN */}
      {isAdmin && (
        <Tab.Screen name="Stock" component={ViewStock} />
      )}

      <Tab.Screen name="Profile" component={ViewProfile} />

    </Tab.Navigator>
  );
};

export default TabNavigator;