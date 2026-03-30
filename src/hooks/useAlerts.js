import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { getData } from '../helpers/StorageService';

export const useAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  const loadAlerts = async () => {
    const products = await getData("products");

    if (!products) return;

    const generatedAlerts = [];

    products.forEach(item => {
      if (item.stock === 0) {
        generatedAlerts.push(`Sin stock: ${item.name}`);
      } else if (item.stock <= 2) {
        generatedAlerts.push(`Stock bajo: ${item.name}`);
      }
    });

    setAlerts(generatedAlerts);
  };

  useFocusEffect(
    useCallback(() => {
      loadAlerts();
    }, [])
  );

  return { alerts };
};