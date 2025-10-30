const express = require('express');
const ProductoController = require('../controllers/producto.controller.js');

class ProductoRoute {
  constructor(app) {
    this.router = express.Router();
    this.controller = new ProductoController();
    this.registerRoutes();
    app.use("/producto-service/producto", this.router);
  }

  registerRoutes() {
    /**
     * @openapi
     * tags:
     *   - name: Productos
     *     description: Endpoints para gestionar productos
     */

    /**
     * @openapi
     * /producto:
     *   post:
     *     summary: Crear un nuevo producto
     *     tags: [Productos]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateProductoDto'
     *     responses:
     *       201:
     *         description: Producto creado
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "Producto creado exitosamente." }
     *                 producto: { $ref: '#/components/schemas/Producto' }
     *       400:
     *         description: Validación fallida o entidad relacionada inexistente
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.post("/", this.controller.createProducto.bind(this.controller));

    /**
     * @openapi
     * /producto:
     *   get:
     *     summary: Obtener productos con paginación y filtro opcional por categoría
     *     tags: [Productos]
     *     parameters:
     *       - in: query
     *         name: categoria
     *         schema: { type: string, example: "Calzado" }
     *         description: Filtra por nombre de la categoría
     *       - in: query
     *         name: page
     *         schema: { type: integer, minimum: 1, example: 1 }
     *         description: Página a consultar (>=1)
     *       - in: query
     *         name: limit
     *         schema: { type: integer, minimum: 1, example: 10 }
     *         description: Tamaño de página (>=1)
     *     responses:
     *       200:
     *         description: Productos obtenidos exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ProductoListResponse'
     *       400:
     *         description: Parámetros de paginación inválidos
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.get("/", this.controller.getProductos.bind(this.controller));

    /**
     * @openapi
     * /producto/{id}:
     *   get:
     *     summary: Obtener un producto por ID
     *     tags: [Productos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: integer }
     *     responses:
     *       200:
     *         description: Producto encontrado
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/Producto' }
     *       404:
     *         description: Producto no encontrado
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.get("/:id", this.controller.getProductoById.bind(this.controller));

    /**
     * @openapi
     * /producto/{id}:
     *   put:
     *     summary: Actualizar un producto
     *     tags: [Productos]
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
     *             $ref: '#/components/schemas/UpdateProductoDto'
     *     responses:
     *       200:
     *         description: Producto actualizado
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "Producto actualizado." }
     *                 producto: { $ref: '#/components/schemas/Producto' }
     *       400:
     *         description: Validación fallida o entidad relacionada inexistente
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       404:
     *         description: Producto no encontrado
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.put("/:id", this.controller.updateProducto.bind(this.controller));

    /**
     * @openapi
     * /producto/{id}:
     *   delete:
     *     summary: Eliminar un producto
     *     tags: [Productos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: integer }
     *     responses:
     *       200:
     *         description: Producto eliminado
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "Producto eliminado exitosamente." }
     *       404:
     *         description: Producto no encontrado
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.delete("/:id", this.controller.deleteProducto.bind(this.controller));
  }
}

module.exports = ProductoRoute;
