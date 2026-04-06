import { useEffect, useState } from 'react';
import productService from '../services/productService';

const useStock = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadStock = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await productService.getAll();
      setProductos(data);
    } catch (e) {
      setError(e?.response?.data?.message ?? 'Error al obtener productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStock();
  }, []);

  return {
    productos,
    loading,
    error,
    refetch: loadStock,
  };
};

export default useStock;