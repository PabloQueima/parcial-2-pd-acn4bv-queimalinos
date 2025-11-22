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
    <div>
      <h1>Panel Administrador</h1>

      <div style={{ marginBottom: 20 }}>
        <h3>Métricas generales</h3>
        <p>Total usuarios: {totales.usuarios}</p>
        <p>Total sesiones: {totales.sesiones}</p>
        <p>Total ejercicios: {totales.ejercicios}</p>
      </div>

      <div style={{ flex: 1 }}>
          <h2>Gestión de Ejercicios</h2>
          <EjerciciosPage />
        </div>
      
      <div style={{ flex: 2 }}>
          <h2>Gestión de Usuarios</h2>
          <UsuariosPage />
        </div>
    </div>
  );
}
