import { Button, Text, TextInput, View } from 'react-native';
import { useAuthViewModel } from '../hooks/useAuthViewModel';
import { useForm } from '../hooks/useForm';

export default function RegisterView({ navigation }) {
  const { values, errors, handleChange, validate } = useForm({
    email: '',
    password: ''
  });

  const { register } = useAuthViewModel();

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      await register(values.email, values.password);
      alert("Usuario registrado correctamente");
      navigation.navigate("Login");
    } catch (error) {
      alert(error.message);
    }
  };

    const vm = useAuthViewModel();
    console.log("VM:", vm);

  return (
    <View>
      <Text>Register</Text>

      <TextInput
        placeholder="Email"
        value={values.email}
        onChangeText={(text) => handleChange("email", text)}
      />

     <TextInput
        placeholder="Password"
        secureTextEntry
        value={values.password}
        onChangeText={(text) => handleChange("password", text)}
     />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}