import { useEffect, useState } from "react";
import {
  getSesiones,
  createSesion,
  updateSesion,
  deleteSesion
} from "../services/api";

import SesionForm from "../components/SesionForm";
import SesionesList from "../components/SesionesList";

export default function SesionesPage() {
  const [sesiones, setSesiones] = useState([]);
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(false);

  // BUSQUEDA + PAGINADO
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // FILTRO POR ROL
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentRol = storedUser?.rol || "cliente";
  const currentId = storedUser?.id || null;

  useEffect(() => {
    cargarSesiones();
  }, [search]);

  async function cargarSesiones() {
    setLoading(true);

    try {
      const data = await getSesiones();

      let result = data || [];

      // FILTRO POR ROL (entrenador ve solo las suyas)
      if (currentRol === "entrenador") {
        result = result.filter(s => Number(s.entrenadorId) === Number(currentId));
      }

      // BUSQUEDA POR TITULO
      if (search.trim() !== "") {
        result = result.filter(s =>
          s.titulo.toLowerCase().includes(search.toLowerCase())
        );
      }

      setSesiones(result);
      setPage(1);
    } catch (err) {
      console.error("Error cargando sesiones:", err);
      setSesiones([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCrear(payload) {
    await createSesion(payload);
    await cargarSesiones();
  }

  async function handleEditar(payload) {
    if (!editando) return;
    await updateSesion(editando.id, payload);
    setEditando(null);
    await cargarSesiones();
  }

  async function handleEliminar(id) {
    if (!confirm("Eliminar sesión?")) return;
    await deleteSesion(id);
    await cargarSesiones();
  }

  function iniciarEdicion(sesion) {
    setEditando(sesion);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // PAGINADO REAL (EN EL FRONT)
  const totalPages = Math.ceil(sesiones.length / pageSize) || 1;
  const pageData = sesiones.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <h2>Gestión de Sesiones</h2>

      {/* BUSCADOR */}
      <input
        placeholder="Buscar sesión por título..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 20 }}
      />

      {/* FORM SOLO PARA ADMIN Y ENTRENADOR */}
      {currentRol !== "cliente" && (
        <SesionForm
          onSubmit={editando ? handleEditar : handleCrear}
          initialData={editando}
        />
      )}

      <hr />

      <h3>Sesiones existentes</h3>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <SesionesList
            sesiones={pageData}
            onEdit={currentRol !== "cliente" ? iniciarEdicion : null}
            onDelete={currentRol !== "cliente" ? handleEliminar : null}
            showAssignInfo={true}
          />

          {/* PAGINADOR */}
          <div style={{ marginTop: 10 }}>
            <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
              ◀
            </button>

            <span style={{ margin: "0 10px" }}>
              Página {page} / {totalPages}
            </span>

            <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
              ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
}
