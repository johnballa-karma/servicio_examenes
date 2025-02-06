import { PORT } from "../config.js";
import express from "express";
import database from "./config/Database.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swagger.js";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
class App {
  constructor() {
    this.app = express();
    this.port = PORT || 443; // Puerto en el que escucha el servidor
    this.db = new database();
    this.setupRoutes();
  }
  setupRoutes() {
    this.app.use(cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      optionsSuccessStatus: 200,
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    this.app.use(bodyParser.json({ limit: "100mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
    this.app.use(express.json());

    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
          supportedSubmitMethods: ["get", "post", "put", "delete"], // Métodos HTTP compatibles
          docExpansion: "list", // Mostrar las rutas de la API en forma de lista
          showRequestHeaders: true, // Mostrar el formulario de encabezados personalizados
          // Aquí puedes personalizar aún más la interfaz de Swagger-UI si es necesario
        },
      })
    );
    // Carga rutas automáticamente desde el directorio "./src/routes"
    const routeDir = path.join(__dirname, "routes");
    const routeFiles = fs.readdirSync(routeDir);
    routeFiles.forEach(async (routeFile) => {
      const routePath = path.join(routeDir, routeFile);
      const routelUrl = pathToFileURL(routePath).toString();
      const routeModule = await import(routelUrl);
      const route = routeModule.default; // Ajusta esto según cómo se exporte tu módulo
      this.app.use(route);
    });

    // Define una ruta para servir archivos estáticos (imágenes en este caso)
    // Configuración CORS para /rest/uploads
    this.app.use('/rest/uploads', cors({
      origin: 'http://181.233.51.147',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      optionsSuccessStatus: 200,
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    this.app.use("/uploads", express.static("uploads"));
  }
  start() {
    this.app.listen(this.port, () => {
      console.log(`Servidor en ejecución en http://localhost:${this.port}`);
    });
  }
}
export default App;