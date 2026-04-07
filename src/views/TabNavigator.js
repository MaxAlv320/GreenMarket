import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MenuView from "./MenuView";
import ViewAlerts from "./ViewAlerts";
import ViewProfile from "./ViewProfile";
import ViewStock from "./ViewStock";

import { useAuthContext } from "../context/authContext";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { isAdmin } = useAuthContext();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#A0D88C",
          borderTopWidth: 0,
          height: 60,
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "rgba(0,0,0,0.5)",
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === "Menu") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Stock") {
            iconName = focused ? "database" : "database-outline";
          } else if (route.name === "Alerts") {
            iconName = focused ? "alert-outline" : "alert-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "account" : "account-outline";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={30} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Menu" component={MenuView} />

      {isAdmin && (
        <>
          <Tab.Screen name="Stock" component={ViewStock} />
          <Tab.Screen name="Alerts" component={ViewAlerts} />
        </>
      )}

      <Tab.Screen name="Profile" component={ViewProfile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
