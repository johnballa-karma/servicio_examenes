import express from 'express';
const router = express.Router();
import validateJSONMiddleware from '../config/validateJSONMiddleware.js';
import controller from '../controllers/authController.js'; // Importa el controlador correspondiente
/**
 * @swagger
 * /rest/auth:
 *   post:
 *     tags: 
 *       - Auth
 *     summary: Autenticación de usuario
 *     description: Permite a los usuarios autenticarse.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *               password:
 *                 type: string
 *                 description: Contraseña
 *     responses:
 *       '200':
 *         description: Autenticación exitosa
 *       '401':
 *         description: No autorizado
 */

router.post('/rest/auth',validateJSONMiddleware, controller.authenticate);

export default  router;