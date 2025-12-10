import axios from "axios";

const API = "http://localhost:3000/api";

export async function login(nombre, password) {
  try {
    const res = await axios.post(`${API}/login`, { nombre, password });

    const { user, token } = res.data;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return user;

  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    throw err;
  }
}

export async function register(nombre, password) {
  try {
    const res = await axios.post(`${API}/register`, { nombre, password });
    return res.data;
  } catch (err) {
    console.error("Register error:", err.response?.data || err.message);
    throw err;
  }
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
