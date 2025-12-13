export default class Ejercicio {
  constructor(
    id,
    nombre,
    descripcion = "",
    parteCuerpo = "",
    elemento = "",
    imageUrl = "",
    createdAt = null
  ) {
    this.id = Number(id);
    this.nombre = String(nombre || "").trim();
    this.descripcion = String(descripcion || "").trim();
    this.parteCuerpo = String(parteCuerpo || "").toLowerCase();
    this.elemento = String(elemento || "").toLowerCase();
    this.imageUrl = String(imageUrl || "").trim();
    this.createdAt = createdAt || new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      parteCuerpo: this.parteCuerpo,
      elemento: this.elemento,
      imageUrl: this.imageUrl,
      createdAt: this.createdAt
    };
  }

  static fromJSON(obj) {
    if (!obj) return null;
    return new Ejercicio(
      obj.id,
      obj.nombre,
      obj.descripcion,
      obj.parteCuerpo,
      obj.elemento,
      obj.imageUrl,
      obj.createdAt
    );
  }
}
