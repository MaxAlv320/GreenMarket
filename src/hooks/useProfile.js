import { useEffect, useState } from "react";
import authService from "../services/authService";
import productService from "../services/productService";

export const useProfile = () => {
  const [perfil, setPerfil] = useState({
    nombreNegocio: "",
    descripcion: "",
    umbralStockBajo: 0,
    umbralStockMedio: 0,
  });

  //Estado para edición (formulario)
  const [form, setForm] = useState({
    nombreNegocio: "",
    descripcion: "",
  });

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Carga inicial
  useEffect(() => {
    loadData();
  }, []);

  //Obtener datos
  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [perfilData, productosData] = await Promise.all([
        authService.getPerfil(),
        productService.getAll(),
      ]);

      const cleanPerfil = {
        nombreNegocio: perfilData.nombreNegocio ?? "",
        descripcion: perfilData.descripcion ?? "",
        umbralStockBajo: perfilData.umbralStockBajo ?? 0,
        umbralStockMedio: perfilData.umbralStockMedio ?? 0,
      };

      setPerfil(cleanPerfil);

      
      setForm({
        nombreNegocio: cleanPerfil.nombreNegocio,
        descripcion: cleanPerfil.descripcion,
      });

      setProductos(productosData);
    } catch (e) {
      setError(e?.response?.data?.message ?? "Error al cargar perfil");
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Guardar cambios
  const savePerfil = async () => {
    setLoading(true);
    setError(null);

    try {
      const updated = await authService.updatePerfil({
        nombreNegocio: form.nombreNegocio,
        descripcion: form.descripcion,
      });

      const updatedPerfil = {
        ...perfil,
        nombreNegocio: updated.nombreNegocio,
        descripcion: updated.descripcion,
      };

      setPerfil(updatedPerfil);

      setForm({
        nombreNegocio: updatedPerfil.nombreNegocio,
        descripcion: updatedPerfil.descripcion,
      });

      return true; 
    } catch (e) {
      setError(e?.response?.data?.message ?? "Error al actualizar perfil");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    //datos listos para usar directo en la vista
    ...perfil,

    //edición
    form,
    handleChange,
    savePerfil,

    //otros
    productos,
    loading,
    error,
    refetch: loadData,
  };
};