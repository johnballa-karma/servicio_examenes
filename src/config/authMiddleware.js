import apiResponse from "../components/apiResponse.js";
import AuthService from"../services/authService.js";

class AuthMiddleware {
  // Middleware para verificar la autenticación del usuario
  requireAuth(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
      const response = new apiResponse(
        false,
        null,
        401,
        "Token de autorización faltante."
      );
      return res.status(401).json(response);
    }

    // Verifica el token utilizando tu lógica de autenticación (puedes usar AuthService.verifyToken)
    AuthService.verifyToken(token)
      .then(decodedToken => {
        // Si el token es válido, permite que la solicitud continúe
        next();
      })
      .catch(error => {
        const response = new apiResponse(
          false,
          null,
          401,
          "Token de autorización inválido o expirado."
        );
        res.status(401).json(response);
      });
  }
}

export default new AuthMiddleware();
