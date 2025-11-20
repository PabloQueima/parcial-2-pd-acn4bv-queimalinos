import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "../data");

const DATA_FILES = [
  { name: "ejercicios.json", initial: [] },
  { name: "usuarios.json", initial: [] },
  { name: "sesiones.json", initial: [] }
];

export const ensureDataFiles = async () => {
  try {
    await fs.mkdir(dataDir, { recursive: true });

    for (const file of DATA_FILES) {
      const filePath = path.join(dataDir, file.name);

      try {
        await fs.access(filePath);
      } catch {
        await fs.writeFile(
          filePath,
          JSON.stringify(file.initial, null, 2),
          "utf-8"
        );
      }
    }
  } catch (err) {
    console.error("[fileService] Error asegurando archivos:", err);
    throw err;
  }
};

export const readJSON = async (filename) => {
  const filePath = path.join(dataDir, filename);

  try {
    const raw = await fs.readFile(filePath, "utf-8");

    if (!raw.trim()) {
      await writeJSON(filename, []);
      return [];
    }

    return JSON.parse(raw);

  } catch (err) {
    console.error(`[fileService] Error leyendo ${filename}:`, err);

    if (err instanceof SyntaxError) {
      await writeJSON(filename, []);
      return [];
    }

    throw err;
  }
};

export const writeJSON = async (filename, data) => {
  const filePath = path.join(dataDir, filename);

  try {
    await fs.writeFile(
      filePath,
      JSON.stringify(data, null, 2),
      "utf-8"
    );
  } catch (err) {
    console.error(`[fileService] Error escribiendo ${filename}:`, err);
    throw err;
  }
};
