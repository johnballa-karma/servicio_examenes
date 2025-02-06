import pg from "pg";
const { Client } = pg;
import sequelize from "./sequelizeConfig.js";
import path from "path";
import fs from "fs";
import EncryptService from "../services/EncriptService.js";
import { dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "../../config.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
class database {
  constructor() {
    this.client = new Client({
      user: DB_USER,
      host: DB_HOST,
      database: DB_DATABASE,
      password: DB_PASSWORD,
      port: DB_PORT,
    });
    this.sequelize = sequelize;
    this.connect();
   
    // Importa tus modelos (asegúrate de que estén definidos)
    
    this.models = {}; // Almacena todos los modelos
    console.log("si pasa para migrar1")
    this.importModels().then(() => {
      console.log("si pasa para migrar")
      this.migrateDatabase()
        .then(() => {
          console.log("Migraciones aplicadas con éxito.");
        })
        .catch((error) => {
          console.error("Error al aplicar migraciones:", error);
        });
    });
  }

  connect() {
    this.client
      .connect()
      .then(() => {
        console.log("Conexión exitosa a PostgreSQL");
      })
      .catch((err) => {
        console.error("Error de conexión:", err);
      });
  }

  disconnect() {
    this.client
      .end()
      .then(() => {
        console.log("Conexión cerrada");
      })
      .catch((err) => {
        console.error("Error al cerrar la conexión:", err);
      });
  }

  async importModels() {
    try {
      const modelsDir = path.join(__dirname, "../models");
      const modelsFiles = await fs.readdirSync(modelsDir);
      for (const modelsFile of modelsFiles) {
        const modelPath = path.join(modelsDir, modelsFile);
        const modelUrl = pathToFileURL(modelPath).toString();
        const module = await import(modelUrl);
        const model = module.default;
        const modelName = model.name;
        this.models[modelName] = model;
      }
      console.log("!Modelos importados!");
    } catch (error) {
      console.error("Error al importar modelos:", error);
    }
  }
  async migrateDatabase() {
    console.log("si migra")
    if (Object.keys(this.models).length === 0) {
      return;
    }
    // for (const modelName in data) {
    //   const model = this.models[modelName];
    //   await model.sync({ alter: true });
    // }
    this.sequelize.sync({ alter: true, force: false });
    // Verifica si ya existe un tipo de usuario para el usuario por defecto que será administrador
    const existeTipoAdmin = await this.models.TipoUsuario.findOne({
      where: { descripcion: "Administrador" },
    });
    // Verifica si ya existe un tipo de usuario para el usuario por defecto que será administrador
    const existeTipoSocio = await this.models.TipoUsuario.findOne({
      where: { descripcion: "Promotor" },
    });
    
  
    if (!existeTipoAdmin) {
      // El tipo deusuario por defecto no existe, así que créalo
      await this.models.TipoUsuario.create({
        descripcion: "Administrador",
      });
    }
    if (!existeTipoSocio) {
      // El tipo de usuario por socio no existe, así que créalo
      await this.models.TipoUsuario.create({
        descripcion: "Promotor",
      });
    }

    const existingUser = await this.models.User.findOne({
      where: { username: "admin" },
    });
    if (existingUser && existingUser.secuencial !== 1) {
      existingUser.secuencial = 1;
      existingUser.email=process.env.CORREO_ADMIN;
      await existingUser.save();
    }
    if (!existingUser) {
      // El usuario por defecto no existe, así que créalo
      await this.models.User.create({
        secuencial:1,
        username: "0000000000",
        email: "admin@hotmail.com",
        nombres: "Administrador",
        apellidos: "",
        cedula: "0000000000",
        password: await EncryptService.hashPassword("admin"),
        avatar: "",
        estaActivo: 1,
        tipoUsuarioSecuencial: "1",
      });
    }
    // Verifica si ya existe un usuario por defecto
    if (existingUser && existingUser.secuencial !== 1) {
      existingUser.secuencial = 1;
      await existingUser.save();
    }
  }
}

export default database;
