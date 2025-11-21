import { Link } from "react-router-dom";
import { getCurrentUser, logout } from "../services/auth";

export default function Navbar() {
  const user = getCurrentUser();

  return (
    <nav style={{ marginBottom: 30 }}>
      {!user && (
        <Link to="/login">Login</Link>
      )}

      {user?.rol === "admin" && (
        <>
          <Link to="/admin">Panel Administrador</Link>
        </>
      )}

      {user?.rol === "entrenador" && (
        <>
          <Link to="/entrenador">Panel Entrenador</Link>
        </>
      )}

      {user?.rol === "cliente" && (
        <>
          <Link to="/cliente">Mis Sesiones</Link>
        </>
      )}

      {user && (
        <button
          onClick={() => {
            logout();
            location.href = "/login";
          }}
          style={{ marginLeft: 20 }}
        >
          Cerrar sesión
        </button>
      )}
    </nav>
  );
}
