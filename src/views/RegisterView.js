import React from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import AuthButton from "../components/AuthButton";
import AuthCard from "../components/AuthCard";
import AuthFooter from "../components/AuthFooter";
import AuthInput from "../components/AuthInput";
import { useForm } from "../hooks/useForm";
import authService from "../services/authService";

export default function RegisterView({ navigation }) {
  const { values, handleChange, validate } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async () => {
    if (loading || !validate()) return;
    setLoading(true);
    try {
      await authService.register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      navigation.replace("Login");
    } catch (error) {
      console.log("Error Registro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/ImageBackground.jpg")}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.brandTitle}>GREEN MARKET</Text>

          <AuthCard
            title="REGISTER"
            subTitle="Create your account"
            showBack={true}
          >
            <AuthInput
              icon="account"
              placeholder="Full Name"
              value={values.name}
              onChangeText={(t) => handleChange("name", t)}
            />
            <AuthInput
              icon="email"
              placeholder="E-mail"
              value={values.email}
              onChangeText={(t) => handleChange("email", t)}
            />
            <AuthInput
              icon="lock"
              placeholder="Password"
              value={values.password}
              onChangeText={(t) => handleChange("password", t)}
              secureTextEntry
            />

            <AuthButton
              text="CREATE ACCOUNT"
              onPress={handleRegister}
              loading={loading}
            />
            <AuthFooter />
          </AuthCard>

          <Text style={styles.footerText}>
            Use GreenMarket to grow your business
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flexGrow: 1, justifyContent: "center", padding: 25 },
  brandTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 20,
  },
  footerText: {
    color: "#FFF",
    textAlign: "center",
    marginTop: 25,
    opacity: 0.7,
  },
});
