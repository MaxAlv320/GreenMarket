import api, { ENDPOINTS } from '../models/api';

const authService = {
  register: (data) => api.post(ENDPOINTS.register, data).then(r => r.data),
  login:    (email, password) =>
    api.post(ENDPOINTS.login, { email, password }).then(r => r.data),
  getPerfil:    () => api.get(ENDPOINTS.perfil).then(r => r.data),
  updatePerfil: (data) => api.put(ENDPOINTS.perfil, data).then(r => r.data),
};

export default authService;