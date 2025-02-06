import TipoUsuario from '../models/TipoUsuario.js'; // Importa el modelo de TipoUsuario
import apiResponse from '../components/apiResponse.js';

class TipoUsuarioController {
  async createTipoUsuario(req, res) {
    try {
      const tipoUsuarioData = req.body;
      const tipoUsuario = await TipoUsuario.create(tipoUsuarioData);

      const response = new apiResponse(true, tipoUsuario, 201, 'Tipo de usuario creado exitosamente');
      res.status(201).json(response);
    } catch (error) {
      const response = new apiResponse(false, null, 500, 'Error del servidor al crear tipo de usuario');
      res.status(500).json(response);
    }
  }
  async getAllTiposUsuario (req, res) {
    try {
      // Realiza una consulta para obtener todos los usuarios
      const users = await TipoUsuario.findAll();
      
      // Devuelve la lista de usuarios como respuesta
      res.status(200).json(users);
    } catch (error) {
      console.error('Error al los tipos de  usuario:', error);
      res.status(500).json({ error: 'Error al obtener los tipos de usuario' });
    }
  };
  async getTipoUsuario(req, res) {
    try {
      const tipoUsuarioId = req.params.id;
      const tipoUsuario = await TipoUsuario.findByPk(tipoUsuarioId);

      if (tipoUsuario) {
        const response = new apiResponse(true, tipoUsuario, 200, 'Tipo de usuario encontrado');
        res.json(response);
      } else {
        const response = new apiResponse(false, null, 404, 'Tipo de usuario no encontrado');
        res.status(404).json(response);
      }
    } catch (error) {
      const response = new apiResponse(false, null, 500, 'Error del servidor al obtener tipo de usuario');
      res.status(500).json(response);
    }
  }

  async updateTipoUsuario(req, res) {
    try {
      const tipoUsuarioId = req.params.id;
      const tipoUsuarioData = req.body;
      const tipoUsuario = await TipoUsuario.findByPk(tipoUsuarioId);

      if (tipoUsuario) {
        await tipoUsuario.update(tipoUsuarioData);
        const response = new apiResponse(true, tipoUsuario, 200, 'Tipo de usuario actualizado exitosamente');
        res.json(response);
      } else {
        const response = new apiResponse(false, null, 404, 'Tipo de usuario no encontrado');
        res.status(404).json(response);
      }
    } catch (error) {
      const response = new apiResponse(false, null, 500, 'Error del servidor al actualizar tipo de usuario');
      res.status(500).json(response);
    }
  }

  async deleteTipoUsuario(req, res) {
    try {
      const tipoUsuarioId = req.params.id;
      const tipoUsuario = await TipoUsuario.findByPk(tipoUsuarioId);

      if (tipoUsuario) {
        await tipoUsuario.destroy();
        const response = new apiResponse(true, null, 204, 'Tipo de usuario eliminado exitosamente');
        res.status(204).json(response);
      } else {
        const response = new apiResponse(false, null, 404, 'Tipo de usuario no encontrado');
        res.status(404).json(response);
      }
    } catch (error) {
      const response = new apiResponse(false, null, 500, 'Error del servidor al eliminar tipo de usuario');
      res.status(500).json(response);
    }
  }
}

export default  new TipoUsuarioController();
