import axios from 'axios';
import { getToken } from '../helpers/StorageService';

export const API = axios.create({
  baseURL: "https://emmetropic-gertrude-asymptotically.ngrok-free.dev"
});

API.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}); 