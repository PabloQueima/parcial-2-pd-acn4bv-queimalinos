import axios from "axios";

const API = "http://localhost:3000/api";

export async function login(email, password) {
  const res = await axios.post(`${API}/login`, { email, password });

  const { user, token } = res.data;

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return user;
}

export async function register(nombre, email, password) {
  const res = await axios.post(`${API}/register`, { nombre, email, password });
  return res.data;
}

export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
}

export function getCurrentUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

const savedToken = localStorage.getItem("token");
if (savedToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
}
