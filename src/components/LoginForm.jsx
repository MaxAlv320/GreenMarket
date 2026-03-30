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
    <AuthCard title="LOGIN">
      <AuthInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <AuthInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <AuthButton text="Entrar" onPress={onSubmit} loading={loading} />

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
    fontWeight: "600",
  },
});
