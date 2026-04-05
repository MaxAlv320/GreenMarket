import { useEffect, useState } from 'react';
import authService from "../services/authService";
import productService from "../services/productService";

export const useProfile = () => {
  const [nombreNegocio, setNombreNegocio] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const [umbralStockBajo, setUmbralStockBajo] = useState(0);
  const [umbralStockMedio, setUmbralStockMedio] = useState(0);

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetchPerfil();
    fetchProductos();
    fetchLowStock();
  }, []);

  //Obtener perfil
  const fetchPerfil = async () => {
    try {
      const data = await authService.getPerfil();

      setNombreNegocio(data.nombreNegocio || '');
      setDescripcion(data.descripcion || '');

      setUmbralStockBajo(data.umbralStockBajo || 0);
      setUmbralStockMedio(data.umbralStockMedio || 0);

    } catch (error) {
      console.log(error.message);
    }
  };

  //Actualizar perfil
  const handleUpdatePerfil = async () => {
    try {
      await authService.updatePerfil({
        nombreNegocio,
        descripcion
      });

      alert("Perfil actualizado");
    } catch (error) {
      alert(error.message);
    }
  };

  //Productos
  const fetchProductos = async () => {
    try {
      const data = await productService.getAll();
      setProductos(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchLowStock = async () => {
      try {
        const data = await productService.getLowStock();
        console.log(data);
      } catch (error) {
          console.log(error.message);
      }
  };

  return {
    nombreNegocio,
    descripcion,
    umbralStockBajo,
    umbralStockMedio,

    setNombreNegocio,
    setDescripcion,
    setUmbralStockBajo,
    setUmbralStockMedio,

    handleUpdatePerfil,

    productos
  };
};