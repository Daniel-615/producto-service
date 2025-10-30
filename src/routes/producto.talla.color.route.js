const express = require('express');
const ProductoTallaColorController = require('../controllers/producto.talla.color.controller.js');

class ProductoTallaRoute {
  constructor(app) {
    this.router = express.Router();
    this.controller = new ProductoTallaColorController();
    this.registerRoutes();
    app.use("/producto-service/producto-talla", this.router);
  }

  registerRoutes() {
    /**
     * @openapi
     * tags:
     *   - name: ProductoTallaColor
     *     description: Variantes de producto por talla y color (stock)
     */

    /**
     * @openapi
     * /producto-talla:
     *   post:
     *     summary: Crear variante (talla+color) para un producto
     *     tags: [ProductoTallaColor]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateProductoTallaColorDto'
     *     responses:
     *       201:
     *         description: Talla Color creada
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "Talla Color creada exitosamente." }
     *                 tallaColor: { $ref: '#/components/schemas/ProductoTallaColor' }
     *       400:
     *         description: Datos inválidos o combinación duplicada / no existen refs
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.post("/", this.controller.createProductoTalla.bind(this.controller));

    /**
     * @openapi
     * /producto-talla:
     *   get:
     *     summary: Listar variantes (talla+color) con info asociada
     *     tags: [ProductoTallaColor]
     *     responses:
     *       200:
     *         description: Lista de variantes
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ProductoTallaColorListResponse'
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.get("/", this.controller.getProductoTalla.bind(this.controller));

    /**
     * @openapi
     * /producto-talla/{id}:
     *   get:
     *     summary: Obtener una variante por ID
     *     tags: [ProductoTallaColor]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: integer }
     *     responses:
     *       200:
     *         description: Variante encontrada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ProductoTallaColor' }
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
    this.router.get("/:id", this.controller.getProductoTallaById.bind(this.controller));

    /**
     * @openapi
     * /producto-talla/{id}:
     *   put:
     *     summary: Actualizar stock de una variante
     *     tags: [ProductoTallaColor]
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
     *               stock: { type: integer, example: 20 }
     *     responses:
     *       200:
     *         description: Variante actualizada
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "Talla Color actualizada." }
     *                 tallaColor: { $ref: '#/components/schemas/ProductoTallaColor' }
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
    this.router.put("/:id", this.controller.updateProductoTalla.bind(this.controller));

    /**
     * @openapi
     * /producto-talla/{id}/decrement:
     *   post:
     *     summary: Decrementar stock de una variante
     *     description: Resta `qty` al stock actual si hay disponibilidad suficiente.
     *     tags: [ProductoTallaColor]
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
     *             required: [qty]
     *             properties:
     *               qty: { type: integer, minimum: 1, example: 2 }
     *     responses:
     *       200:
     *         description: Decremento aplicado
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success: { type: boolean, example: true }
     *                 stock: { type: integer, example: 13 }
     *       400:
     *         description: qty inválido
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       404:
     *         description: Variante no encontrada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       409:
     *         description: Stock insuficiente
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.post("/:id/decrement", this.controller.decrementStock.bind(this.controller));

    /**
     * @openapi
     * /producto-talla/{id}:
     *   delete:
     *     summary: Eliminar variante
     *     tags: [ProductoTallaColor]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: integer }
     *     responses:
     *       200:
     *         description: Eliminada correctamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "Talla Color eliminada exitosamente." }
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
    this.router.delete("/:id", this.controller.deleteProductoTalla.bind(this.controller));
  }
}

module.exports = ProductoTallaRoute;
