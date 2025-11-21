import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardEntrenador from "./pages/DashboardEntrenador";
import DashboardCliente from "./pages/DashboardCliente";

import Navbar from "./components/Navbar";
import { getCurrentUser } from "./services/auth";

export default function App() {
  const user = getCurrentUser();

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={user?.rol === "admin" ? <DashboardAdmin /> : <Navigate to="/login" />}
        />

        <Route
          path="/entrenador"
          element={user?.rol === "entrenador" ? <DashboardEntrenador /> : <Navigate to="/login" />}
        />

        <Route
          path="/cliente"
          element={user?.rol === "cliente" ? <DashboardCliente /> : <Navigate to="/login" />}
        />

      </Routes>
    </BrowserRouter>
  );
}
