import User from "../models/User.js";
import apiResponse from "../components/apiResponse.js";
import EncryptService from "../services/EncriptService.js";
import sequelize from "../config/sequelizeConfig.js";
import { Sequelize } from "sequelize";
class UserController {
  async createUser(req, res) {
    try {
      const userData = req.body;
      const passwordHash = await EncryptService.hashPassword(userData.password);
      userData.password = passwordHash;
      const user = await User.create(userData);
      const response = new apiResponse(
        true,
        user,
        200,
        "Usuario creado exitosamente"
      );
      res.status(200).json(response);
    } catch (error) {
      const response = new apiResponse(false, null, 500, error.message);
      res.status(500).json(response);
    }
  }
  async createUserDirectorio(req, res) {
    try {
      const userData = req.body;
      userData.tipoUsuarioSecuencial = 3;
      const passwordHash = await EncryptService.hashPassword(userData.password);
      userData.password = passwordHash;
      console.log(userData);
      const user = await User.create(userData);
      const response = new apiResponse(
        true,
        user,
        200,
        "Directorio creado exitosamente"
      );
      res.status(200).json(response);
    } catch (error) {
      const response = new apiResponse(false, null, 500, error.message);
      res.status(500).json(response);
    }
  }
  async getAllUsers(req, res) {
    try {
      // Realiza una consulta para obtener todos los usuarios
      const users = await User.findAll({
        where: {
          secuencial: {
            [Sequelize.Op.gte]: 2, // Op.gte representa "mayor o igual que 1"
          },
        },
      });
      // Devuelve la lista de usuarios como respuesta
      res.status(200).json(users);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      res.status(500).json({ error: "Error al obtener usuarios" });
    }
  }
  async getAllActiveUsers(req, res) {
    try {
      // Realiza una consulta para obtener todos los usuarios
      const users = await User.findAll({
        where: {
          estaActivo: 0,
          estadoCuenta: 1,
          tipoUsuarioSecuencial: 1,
        },
      });

      // Devuelve la lista de usuarios como respuesta
      res.status(200).json(users);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      res.status(500).json({ error: "Error al obtener usuarios" });
    }
  }
  async getAllUsersDirectorio(req, res) {
    try {
      // Realiza una consulta para obtener todos los usuarios
      const users = await User.findAll({
        where: {
          tipoUsuarioSecuencial: 3,
        },
      });
      const response = new apiResponse(
        true,
        users,
        200,
        "Directivo encontrado"
      );
      // Devuelve la lista de usuarios como respuesta
      res.status(200).json(response);
    } catch (error) {
      const response = new apiResponse(
        false,
        null,
        500,
        "Error del servidor al obtener Directivos"
      );
      res.status(500).json(response);
    }
  }
  async getAllUsersActiveDirectorio(req, res) {
    try {
      // Realiza una consulta para obtener todos los usuarios
      const users = await User.findAll({
        where: {
          estaActivo: 0,
          tipoUsuarioSecuencial: 3,
        },
      });

      // Devuelve la lista de usuarios como respuesta
      res.status(200).json(users);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      res.status(500).json({ error: "Error al obtener usuarios" });
    }
  }
  async getMiembrobyPlanApliacion(req, res) {
    try {
      const fechaActual = new Date();
      const publicidad = await sequelize.query(
        `Select u.secuencial, sp."planSecuencial", sp.secuencial  as secuencialUsuarioPlan
        , u.username, u.nombres, u.apellidos, p."nombrePlan",p."diasPlan", p."costoPlan", 
        sp."urlPago", u."estaActivo", sp."estaActivo" as estaactivoplan from "User" u, "UsuarioPlan" sp, "Plan" p
        where u.secuencial=sp."userSecuencial" and sp."planSecuencial"=p.secuencial 
        and sp."estaActivo"=0 and u."estaActivo"=1`,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
      const response = new apiResponse(
        true,
        publicidad,
        200,
        "Usuario  obtenidas exitosamente"
      );
      res.status(200).json(response);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      const response = new apiResponse(
        true,
        null,
        500,
        "Error al obtener los usuarios"
      );
      res.status(500).json(response);
    }
  }
  async getMiembrobyPlanRenovacion(req, res) {
    try {
      const fechaActual = new Date();
      const publicidad = await sequelize.query(
        `Select u.secuencial, sp."planSecuencial", sp.secuencial  as secuencialUsuarioPlan
        , u.username, u.nombres, u.apellidos, p."nombrePlan",p."diasPlan", p."costoPlan" , 
        sp."urlPago", u."estaActivo", sp."estaActivo" as estaactivoplan from "User" u, "UsuarioPlan" sp, "Plan" p
        where u.secuencial=sp."userSecuencial" and sp."planSecuencial"=p.secuencial 
        and sp."estaActivo"=0 and u."estaActivo"=2`,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
      const response = new apiResponse(
        true,
        publicidad,
        200,
        "Usuario  obtenidas exitosamente"
      );
      res.status(200).json(response);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      const response = new apiResponse(
        true,
        null,
        500,
        "Error al obtener los usuarios"
      );
      res.status(500).json(response);
    }
  }
  async getAllUsersDesactivos(req, res) {
    try {
      // Realiza una consulta para obtener todos los usuarios
      const users = await User.findAll({
        where: {
          estaActivo: 0,
          estadoCuenta: 1,
        },
      });
      // Devuelve la lista de usuarios como respuesta
      res.status(200).json(users);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      res.status(500).json({ error: "Error al obtener usuarios" });
    }
  }
  async getUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);

      if (user) {
        const response = new apiResponse(true, user, 200, "Usuario encontrado");
        res.json(response);
      } else {
        const response = new apiResponse(
          false,
          null,
          404,
          "Usuario no encontrado"
        );
        res.status(404).json(response);
      }
    } catch (error) {
      const response = new apiResponse(
        false,
        null,
        500,
        "Error del servidor al obtener usuario"
      );
      res.status(500).json(response);
    }
  }
  async getUserByCedula(req, res) {
    try {
      const cedula = req.params.cedula;
      const user = await User.findOne({
        where: {
          cedula: cedula,
        },
      });
      if (user) {
        const response = new apiResponse(true, user, 200, "Usuario encontrado");
        res.json(response);
      } else {
        const response = new apiResponse(
          false,
          null,
          404,
          "Usuario no encontrado"
        );
        res.status(404).json(response);
      }
    } catch (error) {
      const response = new apiResponse(
        false,
        null,
        500,
        "Error del servidor al obtener usuario"
      );
      res.status(500).json(response);
    }
  }
  async getUserSecuencial(req, res) {
    try {
      const secuencial = req.params.secuencial;
      const user = await User.findOne({
        where: {
          secuencial: secuencial,
        },
      });
      if (user) {
        const response = new apiResponse(true, user, 200, "Usuario encontrado");
        res.json(response);
      } else {
        const response = new apiResponse(
          false,
          null,
          404,
          "Usuario no encontrado"
        );
        res.status(404).json(response);
      }
    } catch (error) {
      const response = new apiResponse(
        false,
        null,
        500,
        "Error del servidor al obtener usuario"
      );
      res.status(500).json(response);
    }
  }
  async getUserByUsername(req, res) {
    try {
      const username = req.params.username;
      const user = await User.findOne({
        where: {
          username: username,
        },
      });
      if (user) {
        const response = new apiResponse(true, user, 200, "Usuario encontrado");
        res.json(response);
      } else {
        const response = new apiResponse(
          false,
          null,
          404,
          "Usuario no encontrado"
        );
        res.status(404).json(response);
      }
    } catch (error) {
      const response = new apiResponse(
        false,
        null,
        500,
        "Error del servidor al obtener usuario"
      );
      res.status(500).json(response);
    }
  }
  async getUser(req, res) {
    try {
      const id = req.params.username;
      const user = await User.findByPk(id);

      if (user) {
        const response = new apiResponse(true, user, 200, "Usuario encontrado");
        res.json(response);
      } else {
        const response = new apiResponse(
          false,
          null,
          404,
          "Usuario no encontrado"
        );
        res.status(404).json(response);
      }
    } catch (error) {
      const response = new apiResponse(
        false,
        null,
        500,
        "Error del servidor al obtener usuario"
      );
      res.status(500).json(response);
    }
  }

  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const userData = req.body;
      const user = await User.findByPk(userId);
      console.log("aqui estoy");
      console.log("aqui estoy"+userData.password);
      console.log("aqui estoy"+user.password);
      if( await EncryptService.checkPassword(userData.password,user.password)){
        console.log("aqui estoy si"+user.password);
       
      }else{
        console.log("aqui estoy no"+user.password);
        const passwordHash = await EncryptService.hashPassword(userData.password);
        userData.password=passwordHash;

      }
     
      if (user) {
        await user.update(userData);
        const response = new apiResponse(
          true,
          user,
          200,
          "Usuario actualizado exitosamente"
        );
        res.json(response);
      } else {
        const response = new apiResponse(
          false,
          null,
          404,
          "Usuario no encontrado"
        );
        res.status(404).json(response);
      }
    } catch (error) {
      const response = new apiResponse(
        false,
        null,
        500,
        "Error del servidor al actualizar usuario"
      );
      res.status(500).json(response);
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);

      if (user) {
        await user.destroy();
        const response = new apiResponse(
          true,
          null,
          204,
          "Usuario eliminado exitosamente"
        );
        res.status(204).json(response);
      } else {
        const response = new apiResponse(
          false,
          null,
          404,
          "Usuario no encontrado"
        );
        res.status(404).json(response);
      }
    } catch (error) {
      const response = new apiResponse(
        false,
        null,
        500,
        "Error del servidor al eliminar usuario"
      );
      res.status(500).json(response);
    }
  }
}

export default new UserController();
