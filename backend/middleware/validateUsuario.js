export function validateUsuario(req, res, next) {
  let { nombre, email, rol, password } = req.body;

  if (!nombre || !nombre.trim()) {
    return res.status(400).json({ error: "El campo 'nombre' es obligatorio." });
  }

  if (!email || typeof email !== "string" || !email.trim()) {
    return res.status(400).json({ error: "El campo 'email' es obligatorio." });
  }

  if (!password || !password.trim()) {
    return res.status(400).json({ error: "El campo 'password' es obligatorio." });
  }

  const rolesValidos = ["admin", "entrenador", "cliente"];
  rol = rol?.toLowerCase();

  if (!rolesValidos.includes(rol)) {
    return res.status(400).json({ error: "Rol inválido." });
  }

  next();
}
