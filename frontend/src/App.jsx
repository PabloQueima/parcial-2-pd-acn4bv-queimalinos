import { Routes, Route, Navigate } from "react-router-dom";

import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardEntrenador from "./pages/DashboardEntrenador";
import DashboardCliente from "./pages/DashboardCliente";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

import Navbar from "./components/Navbar";
import { getCurrentUser } from "./services/authService";

export default function App() {
  const user = getCurrentUser();

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            user?.rol === "admin"
              ? <DashboardAdmin />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/entrenador"
          element={
            user?.rol === "entrenador"
              ? <DashboardEntrenador />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/cliente"
          element={
            user?.rol === "cliente"
              ? <DashboardCliente />
              : <Navigate to="/login" />
          }
        />
      </Routes>
    </>
  );
}
