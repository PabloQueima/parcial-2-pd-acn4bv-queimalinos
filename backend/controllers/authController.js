import { db } from "../firebase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecreto123";

export async function login(req, res) {
  const { nombre, password } = req.body;

  if (!nombre || !password) {
    return res.status(400).json({ error: "Faltan credenciales" });
  }

  try {
    const snap = await db
      .collection("usuarios")
      .where("nombre", "==", nombre)
      .get();

    if (snap.empty) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const rawData = snap.docs[0].data();
    const userId = snap.docs[0].id;

    const ok = await bcrypt.compare(password, rawData.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: userId, nombre: rawData.nombre, rol: rawData.rol },
      JWT_SECRET,
      { expiresIn: "4h" }
    );

    return res.json({
      user: {
        id: userId,
        nombre: rawData.nombre,
        rol: rawData.rol
      },
      token
    });

  } catch (err) {
    console.error("Error en login:", err);
    return res.status(500).json({ error: "Error interno en el servidor" });
  }
}

export async function register(req, res) {
  try {
    const { nombre, password } = req.body;

    if (!nombre || !password) {
      return res.status(400).json({ error: "nombre y password son obligatorios" });
    }

    const existing = await db
      .collection("usuarios")
      .where("nombre", "==", nombre.trim())
      .limit(1)
      .get();

    if (!existing.empty) {
      return res.status(400).json({ error: "El nombre de usuario ya está en uso" });
    }

    const hash = await bcrypt.hash(password, 10);

    const nuevo = {
      id: Date.now(),
      nombre: nombre.trim(),
      rol: "cliente",
      passwordHash: hash
    };

    const ref = await db.collection("usuarios").add(nuevo);

    const token = jwt.sign(
      { id: ref.id, nombre: nuevo.nombre, rol: nuevo.rol },
      JWT_SECRET,
      { expiresIn: "4h" }
    );

    return res.status(201).json({
      user: {
        id: ref.id,
        nombre: nuevo.nombre,
        rol: nuevo.rol
      },
      token
    });

  } catch (err) {
    console.error("Error en register:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
