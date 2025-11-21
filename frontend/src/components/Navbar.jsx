import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav style={{ padding: 15, background: "#eee", marginBottom: 20 }}>
      <b>{user.nombre}</b> — {user.rol}

      <button
        style={{ marginLeft: 20 }}
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
    </nav>
  );
}
