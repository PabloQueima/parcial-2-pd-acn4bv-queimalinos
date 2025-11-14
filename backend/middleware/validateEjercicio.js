export function validateEjercicio(req, res, next) {
  const { nombre } = req.body;

  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({
      error: "El campo 'nombre' es obligatorio y debe ser texto."
    });
  }

  next();
}
