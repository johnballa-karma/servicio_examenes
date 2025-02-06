let config;

if (process.env.NODE_ENV === "production") {
  config = await import("../config/config.production.js").then(
    (module) => module.default
  );
}
if (process.env.NODE_ENV === "development") {
  config = await import("../config/config.development.js").then(
    (module) => module.default
  );
} else {
  config = await import("../config/config.local.js").then((module) => module.default);
}
import fs from "fs";
import path from "path";
import swaggerSpec from "../../swagger.js"; // Asegúrate de reemplazar con la ruta correcta a tu archivo swagger.js
import { dirname } from "path";

import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outputDir = path.join(__dirname, "../../utils");
const name = await config.postmanFileName;
const jsonOutputPath = outputDir + "/" + name + ".json";

// Verificar si el directorio "utils" existe, si no, créalo
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Crear un nuevo archivo y escribir el contenido de swaggerSpec en él
fs.writeFileSync(jsonOutputPath, JSON.stringify(swaggerSpec, null, 2), "utf8");

console.log("Documento Swagger JSON generado exitosamente en:", jsonOutputPath);
