import { db } from "../firebase.js";

const COLLECTION_MAP = {
  "usuarios.json": "usuarios",
  "ejercicios.json": "ejercicios",
  "sesiones.json": "sesiones"
};

export const ensureDataFiles = async () => {
  console.log("[fileService] Modo Firestore: no se requieren archivos locales.");
};

export const readJSON = async (filename) => {
  const collectionName = COLLECTION_MAP[filename];
  if (!collectionName) {
    throw new Error(`No existe la colección asociada a: ${filename}`);
  }

  try {
    const snap = await db.collection(collectionName).get();
    return snap.docs.map(doc => doc.data());

  } catch (err) {
    console.error(`[fileService] Error leyendo colección ${collectionName}:`, err);
    throw err;
  }
};


export const writeJSON = async (filename, data) => {
  const collectionName = COLLECTION_MAP[filename];
  if (!collectionName) {
    throw new Error(`No existe la colección asociada a: ${filename}`);
  }

  if (!Array.isArray(data)) {
    throw new Error(`writeJSON requiere un array, recibido: ${typeof data}`);
  }

  try {
    const snap = await db.collection(collectionName).get();
    const batchDelete = db.batch();

    snap.forEach(doc => batchDelete.delete(doc.ref));
    await batchDelete.commit();

    const batchWrite = db.batch();
    const col = db.collection(collectionName);

    data.forEach(item => {
      const docRef = col.doc(String(item.id));

      batchWrite.set(docRef, item);
    });

    await batchWrite.commit();

    console.log(`[fileService] Firestore actualizado: ${collectionName}`);

  } catch (err) {
    console.error(`[fileService] Error escribiendo colección ${collectionName}:`, err);
    throw err;
  }
};
