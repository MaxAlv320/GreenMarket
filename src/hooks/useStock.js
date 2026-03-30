import { useEffect, useState } from 'react';
import { getData, saveData } from '../helpers/StorageService';
import { products as mockProducts } from '../helpers/mockData';

export const useStock = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const stored = await getData("products");

      if (stored) {
        setItems(stored);
      } else {
        setItems(mockProducts);
        await saveData("products", mockProducts);
      }
    };

    loadProducts();
  }, []);

  const updateStock = async (updatedItems) => {
    setItems(updatedItems);
    await saveData("products", updatedItems);
  };

  const increaseStock = (id) => {
    const updated = items.map(item =>
      item.id === id ? { ...item, stock: item.stock + 1 } : item
    );
    updateStock(updated);
  };

  const decreaseStock = (id) => {
    const updated = items.map(item =>
      item.id === id
        ? { ...item, stock: Math.max(item.stock - 1, 0) }
        : item
    );
    updateStock(updated);
  };

  return {
    items,
    increaseStock,
    decreaseStock
  };
};