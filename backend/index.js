import express from "express";
import ejerciciosRoutes from "./routes/ejercicios.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// middleware de logging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// registrar rutas
app.use("/ejercicios", ejerciciosRoutes);

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
