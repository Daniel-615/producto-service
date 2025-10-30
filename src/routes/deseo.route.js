const express = require('express');
const DeseoController = require('../controllers/deseo.controller');

class DeseoRoute {
  constructor(app) {
    this.router = express.Router();
    this.controller = new DeseoController();
    this.registerRoutes();
    app.use('/producto-service/deseo', this.router);
  }

  registerRoutes() {
    /**
     * @openapi
     * tags:
     *   - name: Deseos
     *     description: Gestión de deseos (Shenron Wish / promociones)
     */

    /**
     * @openapi
     * /usuarios/{usuarioId}/deseos:
     *   post:
     *     summary: Crear un deseo para un usuario con una promoción
     *     tags: [Deseos]
     *     parameters:
     *       - in: path
     *         name: usuarioId
     *         required: true
     *         schema: { type: integer }
     *         description: ID del usuario
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateDeseoDto'
     *     responses:
     *       201:
     *         description: Deseo creado
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success: { type: boolean, example: true }
     *                 message: { type: string, example: "Deseo creado exitosamente." }
     *                 deseo: { $ref: '#/components/schemas/Deseo' }
     *       400:
     *         description: Falta usuarioId/promocionId o datos inválidos
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       404:
     *         description: Promoción no encontrada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.post(
      '/usuarios/:usuarioId/deseos',
      (req, res) => this.controller.createDeseo(req, res)
    );

    /**
     * @openapi
     * /usuarios/{usuarioId}/deseos:
     *   get:
     *     summary: Listar deseos de un usuario (filtrables por estado)
     *     tags: [Deseos]
     *     parameters:
     *       - in: path
     *         name: usuarioId
     *         required: true
     *         schema: { type: integer }
     *       - in: query
     *         name: estado
     *         required: false
     *         schema:
     *           type: string
     *           enum: [CREADO, CONSUMIDO, EXPIRADO]
     *         description: Filtrar por estado del deseo
     *       - in: query
     *         name: limit
     *         required: false
     *         schema: { type: integer, minimum: 1, example: 10 }
     *         description: Limitar cantidad de resultados
     *     responses:
     *       200:
     *         description: Lista de deseos del usuario
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success: { type: boolean, example: true }
     *                 data:
     *                   type: array
     *                   items: { $ref: '#/components/schemas/Deseo' }
     *       400:
     *         description: Falta usuarioId
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.get('/usuarios/:usuarioId/deseos',
      (req, res) => this.controller.getDeseosByUsuario(req, res)
    );

    /**
     * @openapi
     * /deseos:
     *   get:
     *     summary: Listar todos los deseos
     *     tags: [Deseos]
     *     responses:
     *       200:
     *         description: Lista de deseos
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items: { $ref: '#/components/schemas/Deseo' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.get(
      '/deseos',
      (req, res) => this.controller.getDeseos(req, res)
    );

    /**
     * @openapi
     * /deseos/{id}:
     *   get:
     *     summary: Obtener un deseo por ID
     *     tags: [Deseos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: integer }
     *     responses:
     *       200:
     *         description: Deseo encontrado
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/Deseo' }
     *       404:
     *         description: Deseo no encontrado
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.get('/deseos/:id',
      (req, res) => this.controller.getDeseoById(req, res)
    );

    /**
     * @openapi
     * /deseos/{id}/consumir:
     *   patch:
     *     summary: Consumir un deseo (incrementa usos y setea estado)
     *     tags: [Deseos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: integer }
     *     responses:
     *       200:
     *         description: Deseo consumido o actualizado
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success: { type: boolean, example: true }
     *                 message: { type: string, example: "Deseo marcado como consumido." }
     *                 deseo: { $ref: '#/components/schemas/Deseo' }
     *       400:
     *         description: Ya consumido o expirado
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       404:
     *         description: Deseo no encontrado
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.patch(
      '/deseos/:id/consumir',
      (req, res) => this.controller.consumeDeseo(req, res)
    );

    /**
     * @openapi
     * /deseos/{id}:
     *   delete:
     *     summary: Marcar un deseo como expirado (soft delete)
     *     tags: [Deseos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: integer }
     *     responses:
     *       200:
     *         description: Deseo expirado correctamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success: { type: boolean, example: true }
     *                 message: { type: string, example: "Deseo marcado como expirado correctamente." }
     *       400:
     *         description: Solo se pueden eliminar deseos activos (CREADO)
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       404:
     *         description: Deseo no encontrado
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.delete(
      '/deseos/:id',
      (req, res) => this.controller.deleteDeseo(req, res)
    );
  }
}

module.exports = DeseoRoute;
