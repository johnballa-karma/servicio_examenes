import { Sequelize } from "sequelize";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "../../config.js";
const sequelize = new Sequelize({
  dialect: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  define: {
    // Evita la pluralización automática de los nombres de las tablas
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci",
  },
});
await sequelize.query("SET lc_time TO 'es_ES.UTF-8'", { raw: true });
export default sequelize;
