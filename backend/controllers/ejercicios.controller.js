import { db } from "../firebase.js";
import Ejercicio from "../models/Ejercicio.js";

// Colección Firestore
const COL = "ejercicios";

export async function listarEjercicios(req, res) {
  try {
    const snap = await db.collection(COL).get();
    const ejercicios = snap.docs.map(doc =>
      Ejercicio.fromJSON(doc.data()).toJSON()
    );
    return res.json(ejercicios);
  } catch (err) {
    console.error("Error listando ejercicios:", err);
    res.status(500).json({ error: "No se pudieron leer ejercicios" });
  }
}

export async function crearEjercicio(req, res) {
  try {
    const { nombre, descripcion, parteCuerpo, elemento } = req.body;

    const nuevo = new Ejercicio(
      Date.now(),
      nombre,
      descripcion,
      parteCuerpo,
      elemento
    );

    await db.collection(COL).doc(String(nuevo.id)).set(nuevo.toJSON());

    return res.status(201).json(nuevo.toJSON());
  } catch (err) {
    console.error("Error creando ejercicio:", err);
    res.status(500).json({ error: "No se pudo crear ejercicio" });
  }
}

export async function actualizarEjercicio(req, res) {
  try {
    const id = String(req.params.id);
    const ref = db.collection(COL).doc(id);
    const snap = await ref.get();

    if (!snap.exists) {
      return res.status(404).json({ error: "Ejercicio no encontrado" });
    }

    const data = snap.data();
    const ejercicio = Ejercicio.fromJSON(data);

    const { nombre, descripcion, parteCuerpo, elemento } = req.body;

    if (nombre !== undefined) ejercicio.nombre = nombre.trim();
    if (descripcion !== undefined) ejercicio.descripcion = descripcion.trim();
    if (parteCuerpo !== undefined)
      ejercicio.parteCuerpo = parteCuerpo.trim().toLowerCase();
    if (elemento !== undefined)
      ejercicio.elemento = elemento.trim().toLowerCase();

    await ref.set(ejercicio.toJSON());

    res.json(ejercicio.toJSON());
  } catch (err) {
    console.error("Error actualizando ejercicio:", err);
    res.status(500).json({ error: "No se pudo actualizar ejercicio" });
  }
}

export async function eliminarEjercicio(req, res) {
  try {
    const id = String(req.params.id);
    await db.collection(COL).doc(id).delete();
    res.status(204).end();
  } catch (err) {
    console.error("Error eliminando ejercicio:", err);
    res.status(500).json({ error: "No se pudo eliminar ejercicio" });
  }
}

export async function buscarEjercicios(req, res) {
  try {
    const { parte, search } = req.query;

    const snap = await db.collection(COL).get();
    let ejercicios = snap.docs.map(doc => Ejercicio.fromJSON(doc.data()));

    if (parte) {
      const p = parte.toLowerCase();
      ejercicios = ejercicios.filter(e =>
        e.parteCuerpo.toLowerCase().includes(p)
      );
    }

    if (search) {
      const term = search.toLowerCase();
      ejercicios = ejercicios.filter(
        e =>
          e.nombre.toLowerCase().includes(term) ||
          e.descripcion.toLowerCase().includes(term)
      );
    }

    return res.json(ejercicios.map(e => e.toJSON()));
  } catch (err) {
    console.error("Error buscando ejercicios:", err);
    res.status(500).json({ error: "Error buscando ejercicios" });
  }
}
