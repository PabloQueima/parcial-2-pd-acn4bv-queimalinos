import EjerciciosPage from "./EjerciciosPage";
import SesionesPage from "./SesionesPage";

export default function DashboardEntrenador() {
  return (
    <div className="container">
      <div className="panel">
        <h2>Gestión de Ejercicios</h2>
        <EjerciciosPage />
      </div>

      <div className="panel">
        <h2>Gestión de Sesiones</h2>
        <SesionesPage />
      </div>
    </div>
  );
}
