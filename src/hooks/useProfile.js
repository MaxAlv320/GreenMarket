import { useEffect, useState } from 'react';
import authService from "../services/authService";
import productService from "../services/productService";

export const useProfile = () => {
  const [perfil, setPerfil] = useState({
    nombreNegocio: '',
    descripcion: '',
    umbralStockBajo: 0,
    umbralStockMedio: 0,
  });

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [perfilData, productosData] = await Promise.all([
        authService.getPerfil(),
        productService.getAll(),
      ]);

      setPerfil({
        nombreNegocio: perfilData.nombreNegocio || '',
        descripcion: perfilData.descripcion || '',
        umbralStockBajo: perfilData.umbralStockBajo || 0,
        umbralStockMedio: perfilData.umbralStockMedio || 0,
      });

      setProductos(productosData);

    } catch (e) {
      setError(e?.response?.data?.message ?? 'Error al cargar perfil');
    } finally {
      setLoading(false);
    }
  };

  return {
    perfil,
    productos,
    loading,
    error,
    refetch: loadData,
  };
};