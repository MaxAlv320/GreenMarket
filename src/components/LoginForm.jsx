import { StyleSheet, Text } from "react-native";
import AuthButton from "./AuthButton";
import AuthCard from "./AuthCard";
import AuthFooter from "./AuthFooter";
import AuthInput from "./AuthInput";

export default function LoginForm({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  loading,
  error,
}) {
  return (
    <AuthCard title="LOGIN" subTitle="Don't have an account?" showBack={false}>
      {/* Input de Usuario con icono de cuenta */}
      <AuthInput
        placeholder="User/E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        icon="account"
      />

      {/* Input de Password con icono de candado */}
      <AuthInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        icon="lock"
      />

      {/* Botón principal estilizado */}
      <AuthButton text="LOGIN" onPress={onSubmit} loading={loading} />

      {/* Manejo de errores de la API */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Sección de redes sociales "Login with" */}
      <AuthFooter />
    </AuthCard>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: "#FF6B6B",
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "600",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 5,
    borderRadius: 5,
  },
});
