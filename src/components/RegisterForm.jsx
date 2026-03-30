import { StyleSheet, Text } from "react-native"; // Importamos Text para el error
import AuthButton from "./AuthButton";
import AuthCard from "./AuthCard";
import AuthFooter from "./AuthFooter";
import AuthInput from "./AuthInput";

export default function RegisterForm({
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  onSubmit,
  loading,
  error,
}) {
  return (
    <AuthCard title="REGISTER">
      <AuthInput placeholder="Nombre" value={name} onChangeText={setName} />
      <AuthInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Input de Password */}
      <AuthInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <AuthButton text="Registrarse" onPress={onSubmit} loading={loading} />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <AuthFooter />
    </AuthCard>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
});
