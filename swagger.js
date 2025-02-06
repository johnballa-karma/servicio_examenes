let config;

if (process.env.NODE_ENV === "production") {
  config = await import("./src/config/config.production.js").then(
    (module) => module.default
  );
}
if (process.env.NODE_ENV === "development") {
  config = await import("./src/config/config.development.js").then(
    (module) => module.default
  );
} else {
  config = await import("./src/config/config.local.js").then(
    (module) => module.default
  );
}


import swaggerJSDoc from "swagger-jsdoc";
import swaggerSchemas from "./src/components/generateSwaggerSchema.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: config.title,
      version: "1.0.0",
      description: config.description,
    },
    servers: [
      {
        url: config.baseUrl, // Reemplaza con la URL base de tu API
        description: config.server, // Puedes agregar una descripción opcional
      },
      // Puedes agregar más servidores si tu API es accesible a través de múltiples URL
    ],
    tags: [
      // Define las etiquetas que deseas utilizar
      {
        name: "Auth",
        description: "Operaciones de autenticación",
      },
      {
        name: "Usuarios",
        description: "Descripción del otro controlador",
      },
      // Agrega más etiquetas según tus controladores
    ],
    components: {
      // Incluye la definición del esquema "User" generado por generateSwaggerSchema
      schemas: swaggerSchemas,
    },
  },
  apis: ["./src/routes/*.js"], // Ruta a tus archivos de definición de rutas
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
