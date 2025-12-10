import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
console.log("authRoutes cargado correctamente");

export default router;
