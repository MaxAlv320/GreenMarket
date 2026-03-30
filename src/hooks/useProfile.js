import { useEffect, useState } from 'react';
import { getData, saveData } from '../helpers/StorageService';

export const useProfile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getData("currentUser");

      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.name || '');
        setEmail(currentUser.email || '');
        setBranch(currentUser.branch || '');
      }
    };

    loadUser();
  }, []);

  const saveProfile = async () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      name,
      email,
      branch
    };

    const users = (await getData("users")) || [];

    const updatedUsers = users.map(u =>
      u.email === user.email ? updatedUser : u
    );

    await saveData("users", updatedUsers);
    await saveData("currentUser", updatedUser);

    alert("Perfil actualizado");
  };

  return {
    name,
    email,
    branch,
    setName,
    setEmail,
    setBranch,
    saveProfile
  };
};