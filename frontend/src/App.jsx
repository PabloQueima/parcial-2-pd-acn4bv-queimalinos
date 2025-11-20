import { Routes, Route, Link } from "react-router-dom";

import EjerciciosPage from "./pages/EjerciciosPage";
import UsuariosPage from "./pages/UsuariosPage";
import SesionesPage from "./pages/SesionesPage";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        <Link to="/ejercicios" style={{ marginRight: 10 }}>Ejercicios</Link>
        <Link to="/usuarios" style={{ marginRight: 10 }}>Usuarios</Link>
        <Link to="/sesiones">Sesiones</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Plataforma de Entrenamiento</h1>} />

        <Route path="/ejercicios" element={<EjerciciosPage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/sesiones" element={<SesionesPage />} />
      </Routes>
    </div>
  );
}
