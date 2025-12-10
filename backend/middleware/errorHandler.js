export default function errorHandler(err, req, res, next) {
  console.error("[ERROR]", err);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.statusCode || 500;

  res.status(status).json({
    error: err.publicMessage || "Error interno del servidor",
    detalle: err.message || "Error desconocido"
  });
}
