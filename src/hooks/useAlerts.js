import { useEffect, useState } from 'react';
import productService from '../services/productService';

const useAlerts = () => {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAlerts = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await productService.getLowStock();

      const normalized = data.map((p) => ({
        id: p._id,
        name: p.nombreProducto,
        alerta: p.alerta,
        nivel: p.nivelStock, // 👈 clave para colores (bajo, medio, etc.)
      }));

      setAlertas(normalized);

    } catch (e) {
      setError(e?.response?.data?.message ?? 'Error al obtener alertas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return {
    alertas,
    loading,
    error,
    refetch: fetchAlerts,
  };
};

export default useAlerts;