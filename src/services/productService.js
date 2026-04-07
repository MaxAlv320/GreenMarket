import api, { ENDPOINTS } from '../models/api';

const productService = {
  // USER + ADMIN
  getAll:       () => api.get(ENDPOINTS.productos).then(r => r.data),
  getLowStock:  () => api.get(ENDPOINTS.bajoStock).then(r => r.data),

  // SOLO ADMIN
  create:  (data) => api.post(ENDPOINTS.productos, data).then(r => r.data),
  update:  (id, data) => api.put(ENDPOINTS.producto(id), data).then(r => r.data),
  delete:  (id) => api.delete(ENDPOINTS.producto(id)).then(r => r.data),
};

export default productService;