import { ScrollView, StyleSheet } from "react-native";

import BrandLogo from "../components/BrandLogo";
import LoginForm from "../components/LoginForm";
import NavButton from "../components/NavButton";

import { useAuthContext } from "../context/authContext";
import { useForm } from "../hooks/useForm";

export default function LoginView({ navigation }) {
  const { login, loginLoading } = useAuthContext();

  const { values, errors, handleChange, validate } = useForm({
    email: "",
    password: "",
  });

  const getErrorMessage = (error) => {
    return (
      error?.response?.data?.message ||
      error?.message ||
      "Error al iniciar sesión"
    );
  };
  
  const handleLogin = async () => {
    if (loginLoading) return;

    const isValid = validate();
    console.log("VALID:", isValid);
    console.log("VALUES:", values);

    if (!isValid) {
      console.log("Errores:", errors);
      return;
    }

    try {
      await login(values.email, values.password);
    } catch (error) {
      console.log("ERROR LOGIN:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BrandLogo />

      <LoginForm
        email={values.email}
        password={values.password}
        setEmail={(text) => handleChange("email", text)}
        setPassword={(text) => handleChange("password", text)}
        onSubmit={handleLogin}
        loading={loginLoading}
        error={errors.email || errors.password}
      />

      <NavButton
        title="Ir a Registro"
        onPress={() => navigation.navigate("Register")}
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
