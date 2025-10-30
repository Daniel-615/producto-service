const express = require('express');
const MarcaController = require('../controllers/marca.controller.js');

class MarcaRoute {
  constructor(app) {
    this.router = express.Router();
    this.controller = new MarcaController();
    this.registerRoutes();
    app.use("/producto-service/marca", this.router);
  }

  registerRoutes() {
    /**
     * @openapi
     * tags:
     *   - name: Marcas
     *     description: Endpoints para gestionar marcas
     */

    /**
     * @openapi
     * /marca:
     *   post:
     *     summary: Crear una nueva marca
     *     tags: [Marcas]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateMarcaDto'
     *     responses:
     *       201:
     *         description: Marca creada exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "Marca creada exitosamente." }
     *                 marca: { $ref: '#/components/schemas/Marca' }
     *       400:
     *         description: Validación fallida o marca duplicada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.post("/", this.controller.createMarca.bind(this.controller));

    /**
     * @openapi
     * /marca:
     *   get:
     *     summary: Obtener todas las marcas
     *     tags: [Marcas]
     *     responses:
     *       200:
     *         description: Lista de marcas
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items: { $ref: '#/components/schemas/Marca' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.get("/", this.controller.getMarcas.bind(this.controller));

    /**
     * @openapi
     * /marca/{id}:
     *   get:
     *     summary: Obtener una marca por ID
     *     tags: [Marcas]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: integer }
     *     responses:
     *       200:
     *         description: Marca encontrada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/Marca' }
     *       404:
     *         description: Marca no encontrada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.get("/:id", this.controller.getMarcaById.bind(this.controller));

    /**
     * @openapi
     * /marca/{id}:
     *   put:
     *     summary: Actualizar una marca por ID
     *     tags: [Marcas]
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
     *             $ref: '#/components/schemas/UpdateMarcaDto'
     *     responses:
     *       200:
     *         description: Marca actualizada correctamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "Marca actualizada correctamente." }
     *                 marca: { $ref: '#/components/schemas/Marca' }
     *       400:
     *         description: Nombre duplicado / inválido
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       404:
     *         description: Marca no encontrada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.put("/:id", this.controller.updateMarca.bind(this.controller));

    /**
     * @openapi
     * /marca/{id}:
     *   delete:
     *     summary: Eliminar una marca por ID
     *     tags: [Marcas]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: integer }
     *     responses:
     *       200:
     *         description: Marca eliminada exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "Marca eliminada exitosamente." }
     *       404:
     *         description: Marca no encontrada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.delete("/:id", this.controller.deleteMarca.bind(this.controller));
  }
}

module.exports = MarcaRoute;
