import { loginService, registerService } from '../services/authService';

export const useAuthViewModel = () => {

  const login = async (email, password) => {
    return await loginService(email, password);
  };

  const register = async (email, password) => {
    return await registerService(email, password);
  };

  return { login, register };
};