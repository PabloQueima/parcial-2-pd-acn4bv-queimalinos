import SesionesPage from "./SesionesPage";
import EjerciciosPage from "./EjerciciosPage";

export default function DashboardEntrenador() {
  return (
    <div>
      <h1>Panel Entrenador</h1>

      <h2>Gestión de Ejercicios</h2>
      <EjerciciosPage />

      <h2>Gestión de Sesiones</h2>
      <SesionesPage />
    </div>
  );
}
