import { Button, Text, TextInput, View } from 'react-native';
import { useForm } from '../hooks/useForm';
import { useAuthViewModel } from '../viewmodels/useAuthViewModel';

export default function LoginView({ navigation }) {
  const { values, errors, handleChange, validate } = useForm({
    email: '',
    password: ''
  });

  const { login } = useAuthViewModel();

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      await login(values.email, values.password);
      navigation.navigate("Menu");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View>
      <Text>Login</Text>

      <TextInput
        placeholder="Email"
        onChangeText={(text) => handleChange("email", text)}
      />
      {errors.email && <Text>{errors.email}</Text>}

      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => handleChange("password", text)}
      />
      {errors.password && <Text>{errors.password}</Text>}

      <Button title="Login" onPress={handleLogin} />

      <Button
        title="Ir a Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}