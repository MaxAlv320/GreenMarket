import { useEffect, useState } from 'react';
import productService from '../services/productService';

const useAlerts = () => {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const data = await productService.getLowStock();

      const normalized = data.map((p) => ({
        id: p._id,
        name: p.nombreProducto,
        alerta: p.alerta,
      }));

      setAlertas(normalized);

    } catch (e) {
      setError(e.message);
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
    refetch: fetchAlerts
  };
};

export default useAlerts;