const express = require('express');
const CategoriaController = require('../controllers/categoria.controller.js');

class CategoriaRoute {
  constructor(app) {
    this.router = express.Router();
    this.controller = new CategoriaController();
    this.registerRoutes();
    app.use('/producto-service/categoria', this.router);
  }

  registerRoutes() {
    /**
     * @openapi
     * tags:
     *   - name: Categorías
     *     description: Endpoints para gestionar categorías
     */

    /**
     * @openapi
     * /categoria:
     *   post:
     *     summary: Crear una nueva categoría
     *     tags: [Categorías]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [nombre]
     *             properties:
     *               nombre: { type: string, example: "Calzado" }
     *     responses:
     *       201:
     *         description: Categoría creada
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "Categoría creada exitosamente." }
     *                 categoria: { type: string, example: "Calzado" }
     *       400:
     *         description: Validación fallida / duplicado
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.post('/', this.controller.createCategoria.bind(this.controller));

    /**
     * @openapi
     * /categoria:
     *   get:
     *     summary: Obtener todas las categorías
     *     tags: [Categorías]
     *     responses:
     *       200:
     *         description: Lista de categorías
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id: { type: integer, example: 1 }
     *                   nombre: { type: string, example: "Ropa deportiva" }
     *                   createdAt: { type: string, format: date-time }
     *                   updatedAt: { type: string, format: date-time }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.get('/', this.controller.getCategorias.bind(this.controller));

    /**
     * @openapi
     * /categoria/{id}:
     *   get:
     *     summary: Obtener una categoría por ID
     *     tags: [Categorías]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: integer }
     *     responses:
     *       200:
     *         description: Categoría encontrada
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id: { type: integer, example: 1 }
     *                 nombre: { type: string, example: "Accesorios" }
     *                 createdAt: { type: string, format: date-time }
     *                 updatedAt: { type: string, format: date-time }
     *       404:
     *         description: No encontrada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.get('/:id', this.controller.getCategoriaById.bind(this.controller));

    /**
     * @openapi
     * /categoria/{id}:
     *   put:
     *     summary: Actualizar una categoría por ID
     *     tags: [Categorías]
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
     *               nombre: { type: string, example: "Ropa" }
     *     responses:
     *       200:
     *         description: Actualizada
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "Categoría actualizada correctamente." }
     *                 categoria:
     *                   type: object
     *                   properties:
     *                     id: { type: integer, example: 1 }
     *                     nombre: { type: string, example: "Ropa" }
     *                     createdAt: { type: string, format: date-time }
     *                     updatedAt: { type: string, format: date-time }
     *       400:
     *         description: Nombre duplicado / inválido
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       404:
     *         description: No encontrada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.put('/:id', this.controller.updateCategoria.bind(this.controller));

    /**
     * @openapi
     * /categoria/{id}:
     *   delete:
     *     summary: Eliminar una categoría por ID
     *     tags: [Categorías]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: integer }
     *     responses:
     *       200:
     *         description: Eliminada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/MessageResponse' }
     *       404:
     *         description: No encontrada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.delete('/:id', this.controller.deleteCategoria.bind(this.controller));
  }
}

module.exports = CategoriaRoute;
