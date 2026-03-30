import { loginService, registerService } from "../services/authService";

export const useAuthViewModel = () => {
  const login = async (email, password) => {
    return await loginService(email, password);
  };

  const register = async (name, email, password) => {
    return await registerService(name, email, password);
  };

  return { login, register };
};
