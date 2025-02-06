import AuthService from "../services/authService.js";
import EncryptService from "../services/EncriptService.js";
import apiResponse from "../components/apiResponse.js";
import User from "../models/User.js";
import { Sequelize } from "sequelize";

// Función para autenticar al usuario
const authenticate = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    const response = new apiResponse(
      false,
      null,
      400,
      "Falta el nombre de usuario o la contraseña"
    );
    return res.status(400).json(response);
  }
  const user = await User.findOne({
    where: {
      [Sequelize.Op.or]: [{ username: username }, { email: username }],
    },
  });
  if (!user) {
    const response = new apiResponse(false, null, 401, "No existe el usuario");
    res.status(401).json(response);
  } else {
    if(! await EncryptService.checkPassword(password,user.password)){
      const response = new apiResponse(false, null, 401, "Contraseña incorrecta");
      return res.status(401).json(response);
    }
    if (user.estadoCuenta === 0) {
       const response = new apiResponse(false, null, 401, "La cuenta no esta activa desde su correo");
       return res.status(401).json(response);
    }
    const token = AuthService.generateToken(
      user.secuencial,
      user.username,
      user.nombres,
      user.apellidos,
      user.cedula,
      user.avatar,
      user.email,
      user.tipoUsuarioSecuencial
    );

    const response = new apiResponse(true, { token }, 200, "Operación exitosa");
    res.json(response);
  }
};

export default  {
  authenticate,
  // Otras funciones relacionadas con la autenticación
};
