const express = require('express');
const ColorController = require('../controllers/color.controller.js');

class ColorRoute {
  constructor(app) {
    this.router = express.Router();
    this.controller = new ColorController();
    this.registerRoutes();
    app.use("/producto-service/color", this.router);
  }

  registerRoutes() {
    /**
     * @openapi
     * tags:
     *   - name: Colores
     *     description: Endpoints para gestionar colores
     */

    /**
     * @openapi
     * /color:
     *   post:
     *     summary: Crear un nuevo color
     *     tags: [Colores]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [nombre]
     *             properties:
     *               nombre:
     *                 type: string
     *                 example: "Rojo"
     *               codigoHex:
     *                 type: string
     *                 description: Código hexadecimal opcional (con o sin #)
     *                 example: "#FF0000"
     *     responses:
     *       201:
     *         description: Color creado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "Color creado exitosamente." }
     *                 color:
     *                   $ref: '#/components/schemas/Color'
     *       400:
     *         description: Validación fallida o color duplicado
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.post("/", this.controller.createColor.bind(this.controller));

    /**
     * @openapi
     * /color:
     *   get:
     *     summary: Obtener todos los colores
     *     tags: [Colores]
     *     responses:
     *       200:
     *         description: Lista de colores
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Color'
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.get("/", this.controller.getColores.bind(this.controller));

    /**
     * @openapi
     * /color/{id}:
     *   get:
     *     summary: Obtener un color por ID
     *     tags: [Colores]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: integer }
     *     responses:
     *       200:
     *         description: Color encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Color'
     *       404:
     *         description: Color no encontrado
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.get("/:id", this.controller.getColoresById.bind(this.controller));

    /**
     * @openapi
     * /color/{id}:
     *   put:
     *     summary: Actualizar un color por ID
     *     tags: [Colores]
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
     *             type: object
     *             properties:
     *               nombre:
     *                 type: string
     *                 example: "Rojo intenso"
     *               codigoHex:
     *                 type: string
     *                 example: "#CC0000"
     *     responses:
     *       200:
     *         description: Color actualizado correctamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "Color actualizado correctamente." }
     *                 color:
     *                   $ref: '#/components/schemas/Color'
     *       400:
     *         description: Nombre duplicado / inválido
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       404:
     *         description: Color no encontrado
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.put("/:id", this.controller.updateColores.bind(this.controller));

    /**
     * @openapi
     * /color/{id}:
     *   delete:
     *     summary: Eliminar un color por ID
     *     tags: [Colores]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: integer }
     *     responses:
     *       200:
     *         description: Color eliminado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "Color eliminado exitosamente." }
     *       404:
     *         description: Color no encontrado
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.delete("/:id", this.controller.deleteColor.bind(this.controller));
  }
}

module.exports = ColorRoute;