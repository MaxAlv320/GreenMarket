import axios from 'axios';
import { getToken, removeToken } from '../helpers/StorageService';

const BASE_URL = 'https://greenmarket-api-1.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
});

// REQUEST → agrega token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

//RESPONSE → detecta token expirado
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      console.log("Token expirado → cerrando sesión");

      await removeToken();
    }

    return Promise.reject(error);
  }
);

export const ENDPOINTS = {
  register: '/api/auth/register',
  login: '/api/auth/login',
  perfil: '/api/auth/perfil',
  productos: '/api/productos',
  bajoStock: '/api/productos/bajo-stock',
  producto: (id) => `/api/productos/${id}`,
};

export default api;

