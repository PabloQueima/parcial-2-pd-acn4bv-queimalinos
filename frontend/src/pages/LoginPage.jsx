import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const user = await login(nombre, password);
    if (!user) {
      setError("Credenciales inválidas");
      return;
    }

    if (user.rol === "admin") navigate("/admin/usuarios");
    if (user.rol === "entrenador") navigate("/entrenador/sesiones");
    if (user.rol === "cliente") navigate("/cliente/sesiones");
  }

  return (
    <div style={{ padding: 30, maxWidth: 400, margin: "0 auto" }}>
      <h2>Iniciar Sesión</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
