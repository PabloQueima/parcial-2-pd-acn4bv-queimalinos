export default class Usuario {
  constructor(id, nombre, email, rol, passwordHash) {
    this.id = Number(id);
    this.nombre = String(nombre || "").trim();
    this.email = String(email || "").trim();
    this.rol = rol?.toLowerCase() || "cliente";
    this.passwordHash = String(passwordHash || "").trim();
  }

  descripcion() {
    return `${this.nombre} (${this.rol})`;
  }

  esCliente() {
    return this.rol === "cliente";
  }

  esEntrenador() {
    return this.rol === "entrenador";
  }

  esAdmin() {
    return this.rol === "admin";
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      email: this.email,
      rol: this.rol,
      passwordHash: this.passwordHash
    };
  }

  static fromJSON(obj) {
    if (!obj) return null;
    return new Usuario(
      obj.id,
      obj.nombre,
      obj.email,
      obj.rol,
      obj.passwordHash
    );
  }
}
