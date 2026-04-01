import { ScrollView, StyleSheet } from "react-native";

import BrandLogo from "../components/BrandLogo";
import RegisterForm from "../components/RegisterForm";

// Hooks
import { useAuthViewModel } from "../hooks/useAuthViewModel";
import { useForm } from "../hooks/useForm";

export default function RegisterView({ navigation }) {
  const { values, errors, handleChange, validate } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const { register, loading } = useAuthViewModel();

  const handleRegister = async () => {
    // if (!validate()) return;

    // try {
    //   await register(values.name, values.email, values.password);
    //   alert("Usuario registrado correctamente");
    //   navigation.navigate("Login");
    // } catch (error) {
    //   alert(error.message);
    // }
    const data = {
      email: '', 
      password: '', 
      rol: ''
    }
    const response = await api.post('/register', data)
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <BrandLogo />

      <RegisterForm
        name={values.name}
        email={values.email}
        password={values.password}
        setName={(text) => handleChange("name", text)}
        setEmail={(text) => handleChange("email", text)}
        setPassword={(text) => handleChange("password", text)}
        onSubmit={handleRegister}
        loading={loading}
        error={errors.name || errors.email || errors.password}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
});
