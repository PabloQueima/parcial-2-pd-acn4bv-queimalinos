import { useEffect, useState } from "react";
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from "../services/api";

import UsuarioForm from "../components/UsuarioForm";
import UsuariosList from "../components/UsuariosList";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    cargarUsuarios();
  }, []);

  async function cargarUsuarios() {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    }
  }

  async function handleCrear(data) {
    await createUsuario(data);
    await cargarUsuarios();
  }

  async function handleEditar(data) {
    await updateUsuario(editando.id, data);
    setEditando(null);
    await cargarUsuarios();
  }

  async function handleEliminar(id) {
    await deleteUsuario(id);
    await cargarUsuarios();
  }

  function iniciarEdicion(usuario) {
    setEditando(usuario);
  }

  // FILTRO
  const filtrados = usuarios.filter(u =>
    u.nombre.toLowerCase().includes(search.toLowerCase())
  );

  // PAGINADO
  const totalPages = Math.ceil(filtrados.length / pageSize);
  const inicio = (page - 1) * pageSize;
  const visibles = filtrados.slice(inicio, inicio + pageSize);

  return (
    <div style={{ padding: 20 }}>
      <h2>Gestión de Usuarios</h2>

      <input
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{ marginBottom: 10 }}
      />

      <UsuarioForm
        onSubmit={editando ? handleEditar : handleCrear}
        initialData={editando}
      />

      <UsuariosList
        usuarios={visibles}
        onEdit={iniciarEdicion}
        onDelete={handleEliminar}
      />

      {/* PAGINADO */}
      <div style={{ marginTop: 15 }}>
        Página {page} de {totalPages}
        <br />

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Anterior
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          style={{ marginLeft: 10 }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
