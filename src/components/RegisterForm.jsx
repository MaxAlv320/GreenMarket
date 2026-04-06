import { StyleSheet, Text } from "react-native";
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
    <AuthCard title="REGISTER" subTitle="Create your account" showBack={true}>
      <AuthInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        icon="account-outline"
      />

      <AuthInput
        placeholder="User/E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        icon="account"
      />

      <AuthInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        icon="lock"
      />

      <AuthButton text="CREATE ACCOUNT" onPress={onSubmit} loading={loading} />

      {error && <Text style={styles.errorText}>{error}</Text>}

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
  },
});
