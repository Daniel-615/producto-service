const express = require('express');
const TallaController = require('../controllers/talla.controller.js');

class TallaRoute {
  constructor(app) {
    this.router = express.Router();
    this.controller = new TallaController();
    this.registerRoutes();
    app.use("/producto-service/talla", this.router);
  }

  registerRoutes() {
    /**
     * @openapi
     * tags:
     *   - name: Tallas
     *     description: Gestión de tallas
     */

    /**
     * @openapi
     * /talla:
     *   post:
     *     summary: Crear una nueva talla
     *     tags: [Tallas]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateTallaDto'
     *     responses:
     *       201:
     *         description: Talla creada exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "Talla creada exitosamente." }
     *                 talla: { $ref: '#/components/schemas/Talla' }
     *       400:
     *         description: Validación fallida o talla duplicada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.post("/", (req, res) => this.controller.createTalla(req, res));

    /**
     * @openapi
     * /talla/{id}:
     *   get:
     *     summary: Obtener una talla por ID
     *     tags: [Tallas]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: integer }
     *     responses:
     *       200:
     *         description: Talla encontrada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/Talla' }
     *       404:
     *         description: Talla no encontrada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.get("/:id", (req, res) => this.controller.getTallaById(req, res));

    /**
     * @openapi
     * /talla:
     *   get:
     *     summary: Obtener todas las tallas
     *     tags: [Tallas]
     *     responses:
     *       200:
     *         description: Lista de tallas
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items: { $ref: '#/components/schemas/Talla' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.get("/", (req, res) => this.controller.getTallas(req, res));

    /**
     * @openapi
     * /talla/{id}:
     *   put:
     *     summary: Actualizar una talla
     *     tags: [Tallas]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: integer }
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateTallaDto'
     *     responses:
     *       200:
     *         description: Talla actualizada correctamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "Talla actualizada correctamente." }
     *                 talla: { $ref: '#/components/schemas/Talla' }
     *       400:
     *         description: Valor duplicado / inválido
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       404:
     *         description: Talla no encontrada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.put("/:id", (req, res) => this.controller.updateTalla(req, res));

    /**
     * @openapi
     * /talla/{id}:
     *   delete:
     *     summary: Eliminar una talla
     *     tags: [Tallas]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: integer }
     *     responses:
     *       200:
     *         description: Talla eliminada exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "Talla eliminada exitosamente." }
     *       404:
     *         description: Talla no encontrada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.delete("/:id", (req, res) => this.controller.deleteTalla(req, res));
  }   
}
module.exports = TallaRoute;
