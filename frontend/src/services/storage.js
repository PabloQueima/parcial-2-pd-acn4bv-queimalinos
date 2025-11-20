// services/storage.js
// Manejo centralizado de localStorage

export const StorageService = {
  save(key, data) {
    try {
      const json = JSON.stringify(data);
      localStorage.setItem(key, json);
    } catch (error) {
      console.error(`Error al guardar "${key}" en localStorage:`, error);
    }
  },

  load(key, fallback = [], modelClass = null) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;

      const parsed = JSON.parse(raw);

      if (modelClass && typeof modelClass.fromJSON === "function") {
        if (Array.isArray(parsed)) {
          return parsed.map(item => modelClass.fromJSON(item));
        }
        return modelClass.fromJSON(parsed);
      }

      return parsed;
    } catch (error) {
      console.error(`Error al leer "${key}" de localStorage:`, error);
      return fallback;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error al eliminar "${key}":`, error);
    }
  },

  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error al limpiar localStorage:", error);
    }
  }
};
