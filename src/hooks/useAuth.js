import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";

export const useAuth = () => {
  // Estados compartidos
  const [name, setName] = useState(""); // solo para register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // LOGIN
  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      await loginUser(email, password);
    } catch (err) {
      setError("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const handleRegister = async () => {
    try {
      setLoading(true);
      setError(null);

      await registerUser(name, email, password);
    } catch (err) {
      setError("Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return {
    // estados
    name,
    email,
    password,

    // setters
    setName,
    setEmail,
    setPassword,

    // estados UI
    loading,
    error,

    // acciones
    handleLogin,
    handleRegister,
  };
};
