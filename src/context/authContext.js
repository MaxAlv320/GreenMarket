import { createContext, useContext } from "react";
import useAuth from "../hooks/useAuth";

// Crear contexto
const AuthContext = createContext();

// Provider (envuelve toda la app)
export const AuthProvider = ({ children }) => {
  const auth = useAuth(); // toda tu lógica ya existente

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto fácilmente
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }

  return context;
};