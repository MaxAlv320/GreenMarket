import { getData, saveData, saveToken } from "../helpers/StorageService";

const USERS_KEY = "users";

export const registerService = async (name, email, password) => {
  const users = (await getData(USERS_KEY)) || [];

  // Verificar si ya existe
  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    throw new Error("El usuario ya existe");
  }

  const newUser = { name, email, password };

  users.push(newUser);

  await saveData(USERS_KEY, users);

  return { message: "Usuario registrado correctamente" };
};

export const loginService = async (email, password) => {
  const users = (await getData(USERS_KEY)) || [];

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const fakeToken = "fake-jwt-token";

  await saveToken(fakeToken);

  return {
    token: fakeToken,
    user,
  };
};
