import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { getLoggedUser } from "./services/auth";

// Páginas por rol
import UsuariosPage from "./pages/UsuariosPage";
import EjerciciosPage from "./pages/EjerciciosPage";
import SesionesPage from "./pages/SesionesPage";
import MisSesionesPage from "./pages/MisSesionesPage";
import Navbar from "./components/Navbar";

export default function App() {
  const user = getLoggedUser();

  return (
    <BrowserRouter>
      {user && <Navbar user={user} />}

      <Routes>
        {/* login */}
        <Route path="/" element={<LoginPage />} />

        {/* ADMIN */}
        <Route
          path="/admin/usuarios"
          element={
            user?.rol === "admin" ? (
              <UsuariosPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* ENTRENADOR */}
        <Route
          path="/entrenador/ejercicios"
          element={
            user?.rol === "entrenador" ? (
              <EjerciciosPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/entrenador/sesiones"
          element={
            user?.rol === "entrenador" ? (
              <SesionesPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* CLIENTE */}
        <Route
          path="/cliente/sesiones"
          element={
            user?.rol === "cliente" ? (
              <MisSesionesPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
