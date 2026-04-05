import { useCallback, useState } from 'react';
import productService from '../services/productService';

const INITIAL_FORM = {
  nombreProducto: '',
  descripcion: '',
  precio: '',
  stock: '',
  categoria: '',
  productor: '',
  ubicacion: '',
  image: null,
};

const useProductForm = (onSuccess) => {
  const [form, setForm]       = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const handleChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const loadProduct = useCallback((product) => {
    setForm({
      nombreProducto: product.nombreProducto ?? '',
      descripcion:    product.descripcion    ?? '',
      precio:         String(product.precio  ?? ''),
      stock:          String(product.stock   ?? ''),
      categoria:      product.categoria      ?? '',
      productor:      product.productor      ?? '',
      ubicacion:      product.ubicacion      ?? '',
      image:          product.image          ?? null,
    });
  }, []);

  const resetForm = useCallback(() => {
    setForm(INITIAL_FORM);
    setError(null);
  }, []);

  // ─── Validaciones separadas por operación ────────────────────────────────

  const validateCreate = () => {
    if (!form.nombreProducto.trim()) return 'El nombre es requerido.';
    if (!form.descripcion.trim())    return 'La descripción es requerida.';
    if (!form.precio || isNaN(form.precio)) return 'El precio debe ser un número.';
    if (!form.stock  || isNaN(form.stock))  return 'El stock debe ser un número.';
    if (!form.categoria.trim())  return 'La categoría es requerida.';
    if (!form.productor.trim())  return 'El productor es requerido.';
    if (!form.ubicacion.trim())  return 'La ubicación es requerida.';
    return null;
  };

  const validateUpdate = () => {
    if (!form.precio || isNaN(form.precio)) return 'El precio debe ser un número.';
    if (!form.stock  || isNaN(form.stock))  return 'El stock debe ser un número.';
    return null;
  };

  // ─── POST /api/productos ─────────────────────────────────────────────────
  const addProduct = useCallback(async () => {
    const err = validateCreate();
    if (err) { setError(err); return; }

    setLoading(true);
    setError(null);
    try {
      // Si hay imagen se usa FormData, si no, JSON normal
      let payload;
      if (form.image) {
        payload = new FormData();
        Object.entries(form).forEach(([key, val]) => {
          if (val !== null && val !== '') payload.append(key, val);
        });
      } else {
        payload = {
          nombreProducto: form.nombreProducto.trim(),
          descripcion:    form.descripcion.trim(),
          precio:         parseFloat(form.precio),
          stock:          parseInt(form.stock, 10),
          categoria:      form.categoria.trim(),
          productor:      form.productor.trim(),
          ubicacion:      form.ubicacion.trim(),
        };
      }

      const created = await productService.create(payload);
      resetForm();
      onSuccess?.('add', created);
    } catch (e) {
      setError(e?.response?.data?.message ?? 'Error al crear el producto.');
    } finally {
      setLoading(false);
    }
  }, [form, onSuccess]);

  // ─── PUT /api/productos/:id  (solo stock y precio) ───────────────────────
  const updateProduct = useCallback(async (id) => {
    const err = validateUpdate();
    if (err) { setError(err); return; }

    setLoading(true);
    setError(null);
    try {
      const payload = {
        precio: parseFloat(form.precio),
        stock:  parseInt(form.stock, 10),
      };
      const updated = await productService.update(id, payload);
      onSuccess?.('update', updated);
    } catch (e) {
      setError(e?.response?.data?.message ?? 'Error al actualizar el producto.');
    } finally {
      setLoading(false);
    }
  }, [form, onSuccess]);

  // ─── DELETE /api/productos/:id ───────────────────────────────────────────
  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await productService.delete(id);
      resetForm();
      onSuccess?.('delete', { id });
    } catch (e) {
      setError(e?.response?.data?.message ?? 'Error al eliminar el producto.');
    } finally {
      setLoading(false);
    }
  }, [onSuccess]);

  return {
    form, loading, error,
    handleChange, loadProduct, resetForm,
    addProduct, updateProduct, deleteProduct,
  };
};

export default useProductForm;