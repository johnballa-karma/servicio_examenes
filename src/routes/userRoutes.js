import express from "express";
import UserController from "../controllers/userController.js";
import AuthMiddleware from "../config/authMiddleware.js";
import validateJSONMiddleware from "../config/validateJSONMiddleware.js";
const router = express.Router();
// Middleware para excluir 'createdAt' y 'updatedAt' en respuestas

/**
 * @openapi
 * /rest/users:
 *   post:
 *     summary: Crea un nuevo usuario.
 *     tags: [Usuarios]
 *     requestBody:
 *       description: Datos del usuario a crear.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User/request'
 *     responses:
 *       '201':
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User/response'
 *       '500':
 *         description: Error del servidor al crear usuario.
 */
router.post(
  "/rest/users",
  AuthMiddleware.requireAuth,
  UserController.createUser
);

/**
 * @openapi
 * /rest/usuarios:
 *   get:
 *     summary: Obtiene un listado de usuarios.
 *     tags: [Usuarios]
 *     responses:
 *       '200':
 *         description: Listado de usuarios obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User/response'
 *       '500':
 *         description: Error del servidor al obtener el listado de usuarios.
 */
router.get("/rest/usuarios",AuthMiddleware.requireAuth, UserController.getAllUsers);
/**
 * @openapi
 * /rest/usuariosdesactivos:
 *   get:
 *     summary: Obtiene un listado de usuarios por activar.
 *     tags: [Usuarios]
 *     responses:
 *       '200':
 *         description: Listado de usuarios por activar obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User/response'
 *       '500':
 *         description: Error del servidor al obtener el listado de usuarios por activar.
 */
router.get("/rest/usuariosdesactivos"
,AuthMiddleware.requireAuth, 
UserController.getAllUsersDesactivos);
router.get(
  "/rest/usuariosapliacion"
  ,AuthMiddleware.requireAuth, 
  UserController.getMiembrobyPlanApliacion
);
router.get(
  "/rest/usuariosrenovacion"
  ,AuthMiddleware.requireAuth, 
  UserController.getMiembrobyPlanRenovacion
);

/**
 * @openapi
 * /rest/users/cedula/{cedula}:
 *   get:
 *     summary: Obtiene un usuario por cedula.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: cedula
 *         required: true
 *         description: username del usuario a buscar.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Usuario encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User/response'
 *       '404':
 *         description: Usuario no encontrado.
 *       '500':
 *         description: Error del servidor al obtener usuario.
 */
router.get(
  "/rest/users/cedula/:cedula",
  UserController.getUserByCedula
);

/**
 * @openapi
 * /rest/users/username/{username}:
 *   get:
 *     summary: Obtiene un usuario por username.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: cedula del usuario a buscar.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Usuario encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User/response'
 *       '404':
 *         description: Usuario no encontrado.
 *       '500':
 *         description: Error del servidor al obtener usuario.
 */
router.get(
  "/rest/users/username/:username",
  AuthMiddleware.requireAuth,
  UserController.getUserByUsername
);

/**
 * @openapi
 * /rest/users/secuencial/{secuencial}:
 *   get:
 *     summary: Obtiene un usuario por secuencial.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: secuencial
 *         required: true
 *         description: secuencial del usuario a buscar.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Usuario encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User/response'
 *       '404':
 *         description: Usuario no encontrado.
 *       '500':
 *         description: Error del servidor al obtener usuario.
 */

router.get(
  "/rest/users/secuencial/:secuencial",
  //AuthMiddleware.requireAuth,
  UserController.getUser
);
/**
 * @openapi
 * /rest/users/{secuencial}:
 *   put:
 *     summary: Actualiza un usuario por secuencial.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: secuencial
 *         required: true
 *         description: secuencial del usuario a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Nuevos datos del usuario.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User/request'
 *     responses:
 *       '200':
 *         description: Usuario actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User/response'
 *       '404':
 *         description: Usuario no encontrado.
 *       '500':
 *         description: Error del servidor al actualizar usuario.
 */
router.put(
  "/rest/users/:id",
  AuthMiddleware.requireAuth,
  UserController.updateUser
);

/**
 * @openapi
 * /rest/users/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Usuario eliminado exitosamente.
 *       '404':
 *         description: Usuario no encontrado.
 *       '500':
 *         description: Error del servidor al eliminar usuario.
 */
router.delete(
  "/rest/users/:id",
  AuthMiddleware.requireAuth,
  UserController.deleteUser
);

export default router;
