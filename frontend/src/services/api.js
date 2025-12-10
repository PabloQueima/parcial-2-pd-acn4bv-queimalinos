const API_URL = "http://localhost:3000/api";

// Obtener token desde localStorage
function authHeaders() {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
}

// HELPERS
function buildQuery(params = {}) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      q.append(k, v);
    }
  });
  return q.toString() ? `?${q.toString()}` : "";
}

// --------------------------------------------------------
// EJERCICIOS
// --------------------------------------------------------
export async function getEjercicios(params = {}) {
  const query = buildQuery(params);
  const res = await fetch(`${API_URL}/ejercicios${query}`, {
    headers: {
      ...authHeaders(),
    },
  });
  return res.json();
}

export async function createEjercicio(data) {
  const res = await fetch(`${API_URL}/ejercicios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateEjercicio(id, data) {
  const res = await fetch(`${API_URL}/ejercicios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteEjercicio(id) {
  await fetch(`${API_URL}/ejercicios/${id}`, {
    method: "DELETE",
    headers: {
      ...authHeaders(),
    },
  });
}

// --------------------------------------------------------
// SESIONES
// --------------------------------------------------------
export async function getSesiones(params = {}) {
  if (params.clienteId) {
    const res = await fetch(`${API_URL}/sesiones/cliente/${params.clienteId}`, {
      headers: { ...authHeaders() },
    });
    return res.json();
  }

  if (params.entrenadorId) {
    const res = await fetch(`${API_URL}/sesiones/entrenador/${params.entrenadorId}`, {
      headers: { ...authHeaders() },
    });
    return res.json();
  }

  const res = await fetch(`${API_URL}/sesiones`, {
    headers: { ...authHeaders() },
  });
  return res.json();
}

export async function getSesionesAll() {
  const res = await fetch(`${API_URL}/sesiones`, {
    headers: { ...authHeaders() },
  });
  return res.json();
}

export async function createSesion(data) {
  const res = await fetch(`${API_URL}/sesiones`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateSesion(id, data) {
  const res = await fetch(`${API_URL}/sesiones/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteSesion(id) {
  await fetch(`${API_URL}/sesiones/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
}

// --------------------------------------------------------
// USUARIOS
// --------------------------------------------------------
export async function getUsuarios(params = {}) {
  const query = buildQuery(params);
  const res = await fetch(`${API_URL}/usuarios${query}`, {
    headers: { ...authHeaders() },
  });
  return res.json();
}

export async function createUsuario(data) {
  const res = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateUsuario(id, data) {
  const res = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteUsuario(id) {
  await fetch(`${API_URL}/usuarios/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
}
