import { useCallback, useEffect, useState } from 'react';
import { getToken, removeToken, saveToken } from '../helpers/StorageService';
import authService from '../services/authService';

// Decode JWT
const decodeJWT = (token) => {
  try {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');

    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    );

    return JSON.parse(json);
  } catch {
    return null;
  }
};

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [rol, setRol] = useState(null);
  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  // RESTORE SESSION
  useEffect(() => {
    const restore = async () => {
      try {
        const savedToken = await getToken();

        if (savedToken) {
          const decoded = decodeJWT(savedToken);

          if (decoded && decoded.exp * 1000 > Date.now()) {
            const role = decoded?.usuario?.rol ?? 'user';

            setToken(savedToken);
            setRol(role);
            setUser(decoded.usuario);
          } else {
            await removeToken();
          }
        }
      } catch (error) {
        console.log("Error restore:", error);
      } finally {
        setLoading(false);
      }
    };

    restore();
  }, []);

  // DETECTAR TOKEN ELIMINADO (interceptor)
  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await getToken();

      if (!storedToken && token) {
        console.log("Token eliminado → logout automático");

        setToken(null);
        setUser(null);
        setRol(null);
      }
    };

    const interval = setInterval(checkToken, 2000);
    return () => clearInterval(interval);
  }, [token]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    setLoginLoading(true);

    try {
      const data = await authService.login(email, password);

      if (!data?.token) {
        throw new Error("No se recibió token");
      }

      await saveToken(data.token);

      const decoded = decodeJWT(data.token);
      const role = decoded?.usuario?.rol ?? 'user';

      setToken(data.token);
      setRol(role);
      setUser(decoded.usuario);

      return true;

    } catch (error) {
      console.log("Login error:", error);
      return false;
    } finally {
      setLoginLoading(false);
    }
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    await removeToken();

    setToken(null);
    setUser(null);
    setRol(null);
  }, []);

  // FLAGS
  const isAdmin = rol === 'admin';
  const isUser = rol === 'user' || rol === 'admin';

  return {
    user,
    rol,
    token,
    loading,
    loginLoading,
    isAdmin,
    isUser,
    login,
    logout,
  };
};

export default useAuth;