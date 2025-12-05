import { db } from "../firebase.js";
import Sesion from "../models/Sesion.js";

const COL = "sesiones";

function buildSesiones(docs) {
  return docs.map(d => Sesion.fromJSON(d.data()));
}

export async function listarSesiones(req, res) {
  try {
    const snap = await db.collection(COL).get();
    let sesiones = buildSesiones(snap.docs);

    if (req.query.clienteId) {
      sesiones = sesiones.filter(
        s => s.clienteId == req.query.clienteId
      );
    }

    return res.json(sesiones.map(s => s.toJSON()));
  } catch (err) {
    console.error("Error en listarSesiones:", err);
    res.status(500).json({ error: "No se pudieron leer sesiones" });
  }
}

export async function crearSesion(req, res) {
  try {
    const { titulo, entrenadorId, clienteId, ejercicios } = req.body;

    const nueva = new Sesion(
      Date.now(),
      titulo,
      ejercicios || [],
      clienteId,
      entrenadorId
    );

    nueva.createdAt = new Date().toISOString();
    nueva.updatedAt = nueva.createdAt;

    await db.collection(COL).doc(String(nueva.id)).set(nueva.toJSON());

    return res.status(201).json(nueva.toJSON());
  } catch (err) {
    console.error("Error creando sesión:", err);
    res.status(500).json({ error: "No se pudo crear sesión" });
  }
}

export async function actualizarSesion(req, res) {
  try {
    const id = String(req.params.id);
    const ref = db.collection(COL).doc(id);
    const snap = await ref.get();

    if (!snap.exists) {
      return res.status(404).json({ error: "Sesión no encontrada" });
    }

    const sesion = Sesion.fromJSON(snap.data());
    const { titulo, entrenadorId, clienteId, ejercicios } = req.body;

    if (titulo !== undefined) sesion.titulo = titulo.trim();
    if (clienteId !== undefined) sesion.clienteId = Number(clienteId);
    if (entrenadorId !== undefined) sesion.entrenadorId = Number(entrenadorId);
    if (Array.isArray(ejercicios)) sesion.ejercicios = ejercicios;

    sesion.updatedAt = new Date().toISOString();

    await ref.set(sesion.toJSON());

    res.json(sesion.toJSON());
  } catch (err) {
    console.error("Error actualizando sesión:", err);
    res.status(500).json({ error: "No se pudo actualizar sesión" });
  }
}

export async function eliminarSesion(req, res) {
  try {
    const id = String(req.params.id);

    const ref = db.collection(COL).doc(id);
    const snap = await ref.get();

    if (!snap.exists) {
      return res.status(404).json({ error: "Sesión no encontrada" });
    }

    await ref.delete();

    return res.status(204).end();
  } catch (err) {
    console.error("Error eliminando sesión:", err);
    res.status(500).json({ error: "No se pudo eliminar sesión" });
  }
}

export async function sesionesPorCliente(req, res) {
  try {
    const clienteId = Number(req.params.id);

    const snap = await db.collection(COL).get();
    const sesiones = buildSesiones(snap.docs)
      .filter(s => s.clienteId === clienteId)
      .map(s => s.toJSON());

    return res.json(sesiones);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo sesiones del cliente" });
  }
}

export async function sesionesPorEntrenador(req, res) {
  try {
    const entrenadorId = Number(req.params.id);

    const snap = await db.collection(COL).get();
    const sesiones = buildSesiones(snap.docs)
      .filter(s => s.entrenadorId === entrenadorId)
      .map(s => s.toJSON());

    return res.json(sesiones);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo sesiones del entrenador" });
  }
}

export async function agregarEjercicioASesion(req, res) {
  try {
    const id = String(req.params.id);
    const { ejercicioId, series, reps } = req.body;

    const ref = db.collection(COL).doc(id);
    const snap = await ref.get();

    if (!snap.exists) {
      return res.status(404).json({ error: "Sesión no encontrada" });
    }

    const sesion = Sesion.fromJSON(snap.data());
    sesion.agregarEjercicio(Number(ejercicioId), Number(series), Number(reps));
    sesion.updatedAt = new Date().toISOString();

    await ref.set(sesion.toJSON());

    return res.json(sesion.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error agregando ejercicio a la sesión" });
  }
}

export async function eliminarEjercicioDeSesion(req, res) {
  try {
    const id = String(req.params.id);
    const ejercicioId = Number(req.params.ejercicioId);

    const ref = db.collection(COL).doc(id);
    const snap = await ref.get();

    if (!snap.exists) {
      return res.status(404).json({ error: "Sesión no encontrada" });
    }

    const sesion = Sesion.fromJSON(snap.data());
    sesion.eliminarEjercicio(ejercicioId);
    sesion.updatedAt = new Date().toISOString();

    await ref.set(sesion.toJSON());

    return res.json(sesion.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error eliminando ejercicio de la sesión" });
  }
}
