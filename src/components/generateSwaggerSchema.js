import fs from "fs";
import path from "path";
import pkg from "lodash";
const { omit } = pkg;

import { fileURLToPath, pathToFileURL } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Objeto para almacenar todos los esquemas Swagger
const swaggerSchemas = {};

// Atributos a omitir en las solicitudes (request)
const excludeInRequest = ["secuencial", "createdAt", "updatedAt"];

// Función para generar un esquema Swagger
function generateSwaggerSchema(attributes, exclude = []) {
  const schema = {
    type: "object",
    properties: {},
    required: [],
  };
  if (attributes && typeof attributes === "object") {
    for (const [key, value] of Object.entries(attributes)) {
      if (!exclude.includes(key)) {
        const property = {
          type: value.type.key.toLowerCase(),
          description: `Descripción de ${key}`,
        };
        if (!value.allowNull) {
          schema.required.push(key);
        }
        schema.properties[key] = property;
      }
    }
  } else {
    // Handle the case when attributes are undefined or null
    console.error("attributes are undefined or null");
  }
  return schema;
}

// Función principal asíncrona
async function generateSwaggerSchemas() {
  try {
    //const carpetaCompleta = path.join(__dirname, '../models');
    const modelsDir = path.join(__dirname, "../models");
    const directorio = fs.readdirSync(modelsDir);

    for (const file of directorio) {
      const modelPath = path.join(modelsDir, file);
      const modelUrl = pathToFileURL(modelPath).toString();
      const modelModule = await import(modelUrl);
      const model = modelModule.default; // Ajusta esto según cómo se exporte tu módulo
      // Genera el esquema Swagger para la entidad
      const modelName = model.name;
      const requestSchema = generateSwaggerSchema(
        model.rawAttributes,
        excludeInRequest
      );
      const responseSchema = generateSwaggerSchema(model.rawAttributes);

      // Agrega los esquemas Swagger al objeto de esquemas
      swaggerSchemas[modelName] = {
        request: requestSchema,
        response: responseSchema,
      };
    }
    // Puedes retornar o hacer lo que necesites con los esquemas generados
  } catch (error) {
    console.error(
      "Error al leer los archivos del directorio de modelos:",
      error
    );
  }
}
// Invoca la función principal y maneja el resultado
await generateSwaggerSchemas();
export default swaggerSchemas;
