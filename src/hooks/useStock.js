import { useCallback, useEffect, useState } from 'react';
import productService from '../services/productService';

const useStock = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);

  const fetchProductos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getAll();
      setProductos(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  //FUNCIÓN REUTILIZABLE PARA STOCK
  const updateStock = async (item, delta) => {
    try {
      await productService.update(item._id, {
        stock: item.stock + delta,
        precio: item.precio, // requerido por backend
      });

      fetchProductos(); // refresca lista
    } catch (e) {
      console.log(e.message);
    }
  };

  // Helpers más claros
  const increaseStock = (item) => updateStock(item, +1);
  const decreaseStock = (item) => {
    if (item.stock <= 0) return;
    updateStock(item, -1);
  };

  return {
    productos,
    loading,
    error,
    refetch: fetchProductos,

    increaseStock,
    decreaseStock,
  };
};

export default useStock;