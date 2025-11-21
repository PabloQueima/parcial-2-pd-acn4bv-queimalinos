// services/auth.js

import { getUsuarios } from "./api";

const AUTH_KEY = "loggedUser";

export async function login(nombre, password) {
  const usuarios = await getUsuarios();

  const found = usuarios.find(
    u =>
      u.nombre.toLowerCase().trim() === nombre.toLowerCase().trim() &&
      u.password === password
  );

  if (!found) return null;

  localStorage.setItem(AUTH_KEY, JSON.stringify(found));
  return found;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function getLoggedUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
