import { Button, Text, TextInput, View } from 'react-native';
import { useAuthViewModel } from '../hooks/useAuthViewModel';
import { useForm } from '../hooks/useForm';

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
      navigation.navigate("Main");
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

      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => handleChange("password", text)}
      />
    

      <Button title="Login" onPress={handleLogin} />

      <Button
        title="Ir a Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}