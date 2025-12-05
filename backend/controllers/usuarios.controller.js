import { db } from "../firebase.js";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

const COL = "usuarios";

function buildUsuarios(docs) {
  return docs.map(doc => Usuario.fromJSON(doc.data()));
}

export async function listarUsuarios(req, res) {
  try {
    const { rol } = req.query;

    const snap = await db.collection(COL).get();
    let usuarios = buildUsuarios(snap.docs);

    if (rol) {
      usuarios = usuarios.filter(
        u => u.rol.toLowerCase() === rol.toLowerCase()
      );
    }

    return res.json(usuarios.map(u => u.toJSON()));
  } catch (err) {
    console.error("Error listando usuarios:", err);
    res.status(500).json({ error: "No se pudieron leer usuarios" });
  }
}

export async function crearUsuario(req, res) {
  try {
    const { nombre, rol, password } = req.body;

    if (!nombre || !rol || !password) {
      return res.status(400).json({
        error: "nombre, rol y password son obligatorios"
      });
    }

    // Hash de contraseña
    const hash = await bcrypt.hash(password, 10);

    const nuevo = new Usuario(Date.now(), nombre, rol, hash);

    await db.collection(COL).doc(String(nuevo.id)).set(nuevo.toJSON());

    return res.status(201).json(nuevo.toJSON());
  } catch (err) {
    console.error("Error creando usuario:", err);
    res.status(500).json({ error: "No se pudo crear usuario" });
  }
}

export async function actualizarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { nombre, rol, password } = req.body;

    const ref = db.collection(COL).doc(String(id));
    const snap = await ref.get();

    if (!snap.exists) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const usuarioActual = Usuario.fromJSON(snap.data());

    // Actualizaciones
    if (nombre !== undefined) usuarioActual.nombre = nombre.trim();
    if (rol !== undefined) usuarioActual.rol = rol.toLowerCase();

    // Rehash si viene nueva contraseña
    if (password !== undefined) {
      usuarioActual.passwordHash = await bcrypt.hash(password, 10);
    }

    await ref.set(usuarioActual.toJSON());

    return res.json(usuarioActual.toJSON());
  } catch (err) {
    console.error("Error actualizando usuario:", err);
    res.status(500).json({ error: "No se pudo actualizar usuario" });
  }
}

export async function eliminarUsuario(req, res) {
  try {
    const id = String(req.params.id);

    const ref = db.collection(COL).doc(id);
    const snap = await ref.get();

    if (!snap.exists) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await ref.delete();

    return res.status(204).end();
  } catch (err) {
    console.error("Error eliminando usuario:", err);
    res.status(500).json({ error: "No se pudo eliminar usuario" });
  }
}
