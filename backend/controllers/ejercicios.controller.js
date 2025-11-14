import fs from "fs";
import path from "path";

const dataPath = path.resolve("data/ejercicios.json");

function leerJSON() {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function escribirJSON(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// GET /ejercicios
export function getEjercicios(req, res) {
  const ejercicios = leerJSON();
  res.json(ejercicios);
}

// POST /ejercicios
export function crearEjercicio(req, res) {
  const ejercicios = leerJSON();
  const nuevo = {
    id: Date.now(),
    nombre: req.body.nombre,
    descripcion: req.body.descripcion || ""
  };

  ejercicios.push(nuevo);
  escribirJSON(ejercicios);

  res.status(201).json(nuevo);
}
