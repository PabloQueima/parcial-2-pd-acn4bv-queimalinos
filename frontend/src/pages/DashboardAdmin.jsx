import UsuariosPage from "./UsuariosPage";
import { useEffect, useState } from "react";
import { getUsuarios, getSesiones, getEjercicios, getSesionesAll } from "../services/api";
import EjerciciosPage from "./EjerciciosPage";

export default function DashboardAdmin() {
  const [totales, setTotales] = useState({
    usuarios: 0,
    sesiones: 0,
    ejercicios: 0,
  });

  useEffect(() => {
    cargarTotales();
  }, []);

  async function cargarTotales() {
    const [u, s, e] = await Promise.all([
      getUsuarios(),
      getSesionesAll(),
      getEjercicios(),
    ]);

    setTotales({
      usuarios: u.length,
      sesiones: s.length,
      ejercicios: e.length,
    });
  }

  return (
    <div style={{ padding: 20, maxWidth: 1400, margin: "0 auto" }}>
      <h1>Panel Administrador</h1>

      <div
        style={{
          marginBottom: 20,
          padding: 16,
          borderRadius: 8,
          border: "1px solid #ddd",
          background: "#fafafa",
        }}
      >
        <h3>Métricas generales</h3>
        <p>Total usuarios: {totales.usuarios}</p>
        <p>Total sesiones: {totales.sesiones}</p>
        <p>Total ejercicios: {totales.ejercicios}</p>
      </div>

      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "flex-start",
        }}
      >
        {/* COLUMNA IZQUIERDA - EJERCICIOS */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            padding: 16,
            borderRadius: 8,
            border: "1px solid #ddd",
            background: "#fff",
          }}
        >
          <h2>Gestión de Ejercicios</h2>
          <EjerciciosPage />
        </div>

        {/* COLUMNA DERECHA - USUARIOS */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            padding: 16,
            borderRadius: 8,
            border: "1px solid #ddd",
            background: "#fff",
          }}
        >
          <h2>Gestión de Usuarios</h2>
          <UsuariosPage />
        </div>
      </div>
    </div>
  );
}
