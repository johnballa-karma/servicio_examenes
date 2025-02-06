import dotenv from "dotenv";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : process.env.NODE_ENV === "development"
      ? ".env.development"
      : ".env.local",
});

export const NODE_ENV = process.env.NODE_ENV;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_DIALECT = process.env.DB_DIALECT;
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const CORREO = process.env.CORREO;
export const CORREO_ADMIN = process.env.CORREO_ADMIN;
export const CLAVE = process.env.CLAVE;
export const CORREO1 = process.env.CORREO1;
export const CLAVE1 = process.env.CLAVE1;
export const NEXT_PUBLIC_BACKEND_URL=process.env.NEXT_PUBLIC_BACKEND_URL;
export const NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL;