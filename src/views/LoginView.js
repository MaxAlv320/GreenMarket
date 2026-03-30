import React from "react";
import { ScrollView, StyleSheet } from "react-native";

// Componentes Reutilizables que ya definimos
import BrandLogo from "../components/BrandLogo";
import LoginForm from "../components/LoginForm";
import NavButton from "../components/NavButton";

// Hooks de lógica
import { useAuthViewModel } from "../hooks/useAuthViewModel";
import { useForm } from "../hooks/useForm";

export default function LoginView({ navigation }) {
  const { values, errors, handleChange, validate } = useForm({
    email: "",
    password: "",
  });

  const { login, loading } = useAuthViewModel();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavButton
          title="Registro"
          onPress={() => navigation.navigate("Register")}
        />
      ),
    });
  }, [navigation]);

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
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <BrandLogo />

      <LoginForm
        email={values.email}
        password={values.password}
        setEmail={(text) => handleChange("email", text)}
        setPassword={(text) => handleChange("password", text)}
        onSubmit={handleLogin} // Conectado a la función de arriba
        loading={loading}
        error={errors.email || errors.password}
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
