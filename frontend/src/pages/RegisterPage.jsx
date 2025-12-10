import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await register(nombre, password);

      setMsg("Usuario registrado correctamente. Ahora podés iniciar sesión.");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setMsg(err.response?.data?.error || "Error al registrarse");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Registrarse</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: 300,
          gap: 15
        }}
      >
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Crear cuenta</button>
      </form>

      {msg && (
        <p>{msg}</p>
      )}
    </div>
  );
}
