import React from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";

import BrandLogo from "../components/BrandLogo";
import RegisterForm from "../components/RegisterForm";

import { useForm } from "../hooks/useForm";
import authService from "../services/authService";

export default function RegisterView({ navigation }) {
  const { values, errors, handleChange, validate } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);

  const getErrorMessage = (error) => {
    return (
      error?.response?.data?.message ||
      error?.message ||
      "Error al registrarse"
    );
  };

  const handleRegister = async () => {
    if (loading) return; // evita doble click
    if (!validate()) return;

    setLoading(true);

    try {
      await authService.register({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      Alert.alert(
        "Éxito",
        "Usuario registrado correctamente",
        [
          {
            text: "Ir a login",
            onPress: () => navigation.replace("Login"),
          },
        ]
      );

    } catch (error) {
      Alert.alert("Error", getErrorMessage(error));
    } finally {
      setLoading(false);
    }
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
