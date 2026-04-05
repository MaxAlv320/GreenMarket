import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

import { useAuthContext } from '../context/authContext';

import LoginView from './LoginView';
import RegisterView from './RegisterView';
import TabNavigator from './TabNavigator';

import AddProductView from './AddProductView';
import EditProductView from './EditProductView';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          {/* Tabs */}
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />

          {/* Screens internas */}
          <Stack.Screen name="AddProduct" component={AddProductView} />
          <Stack.Screen name="EditProduct" component={EditProductView} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginView} />
          <Stack.Screen name="Register" component={RegisterView} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;