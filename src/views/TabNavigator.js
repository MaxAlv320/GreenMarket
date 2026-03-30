import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// 1. Importas la librería de iconos
import { Ionicons } from "@expo/vector-icons";

import MenuView from "../views/MenuView";
import ViewAlerts from "../views/ViewAlerts";
import ViewProfile from "../views/ViewProfile";
import ViewStock from "../views/ViewStock";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: "#D9D9D9",
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Menu"
        component={MenuView}
        options={{
          // 2. AQUÍ es donde agregas el icono
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "restaurant" : "restaurant-outline"}
              size={24}
              color={focused ? "#333" : "#888"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Stock"
        component={ViewStock}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "cube" : "cube-outline"}
              size={24}
              color={focused ? "#333" : "#888"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Alerts"
        component={ViewAlerts}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              size={24}
              color={focused ? "#333" : "#888"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ViewProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={focused ? "#333" : "#888"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
