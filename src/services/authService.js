import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config.js";
class AuthService {
  static generateToken(
    secuencial,
    username,
    nombres,
    apellidos,
    cedula,
    avatar,
    email,
    tipoUsuarioSecuencial
  ) {
    return jwt.sign(
      {
        secuencial,
        username,
        nombres,
        apellidos,
        cedula,
        avatar,
        email,
        tipoUsuarioSecuencial,
      },
      JWT_SECRET,
      { expiresIn: "2h" }
    );
  }

  static verifyToken(token) {
    return new Promise((resolve, reject) => {
      try {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
          if (err) {
            if (err.name === 'JsonWebTokenError') {
              // Token JWT inválido o malformado
              reject('Token JWT inválido o malformado');
            } else if (err.name === 'TokenExpiredError') {
              // Token JWT caducado
              reject('Token JWT caducado');
            } else {
              // Otro error al verificar el token
              reject('Error al verificar el token JWT');
            }
          } else {
            // Token JWT verificado correctamente
            resolve(decoded);
          }
        });
      } catch (error) {
        // Error inesperado
        reject('Error inesperado al verificar el token JWT');
      }
    });
  }
}

export default  AuthService;
