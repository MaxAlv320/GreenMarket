import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import LoginForm from "../components/LoginForm";
import { useAuthContext } from "../context/authContext";
import { useForm } from "../hooks/useForm";

export default function LoginView({ navigation }) {
  const { login, loginLoading } = useAuthContext();
  const { values, handleChange, validate } = useForm({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    if (validate()) {
      try {
        await login(values.email, values.password);
      } catch (err) {
        console.log("Error login:", err);
      }
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

          <LoginForm
            email={values.email}
            password={values.password}
            setEmail={(text) => handleChange("email", text)}
            setPassword={(text) => handleChange("password", text)}
            onSubmit={handleLogin}
            loading={loginLoading}
          />

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
    letterSpacing: 2,
  },
  footerText: {
    color: "#FFF",
    textAlign: "center",
    marginTop: 25,
    opacity: 0.7,
  },
});
