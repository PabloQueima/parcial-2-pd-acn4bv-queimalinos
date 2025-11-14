import { Router } from "express";
import { getEjercicios, crearEjercicio } from "../controllers/ejercicios.controller.js";
import { validateEjercicio } from "../middleware/validateEjercicio.js";

const router = Router();

router.get("/", getEjercicios);
router.post("/", validateEjercicio, crearEjercicio);

export default router;
