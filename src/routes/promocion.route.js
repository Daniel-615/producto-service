const express = require('express');
const PromocionController = require('../controllers/promocion.controller');

class PromocionRoute {
  constructor(app) {
    this.router = express.Router();
    this.controller = new PromocionController(); 
    this.registerRoutes();
    app.use("/producto-service/promocion", this.router);
  }

  registerRoutes() {
    /**
     * @openapi
     * tags:
     *   - name: Promociones
     *     description: Gestión de promociones y cupones (envío gratis, descuentos)
     */

    /**
     * @openapi
     * /promocion:
     *   post:
     *     summary: Crear una promoción
     *     tags: [Promociones]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreatePromocionDto'
     *     responses:
     *       201:
     *         description: Promoción creada
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "Promoción creada." }
     *                 promocion: { $ref: '#/components/schemas/Promocion' }
     *       400:
     *         description: Datos inválidos (tipo/porcentaje/fecha/metadata)
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.post('/', (req, res) => this.controller.createPromocion(req, res));

    /**
     * @openapi
     * /promocion:
     *   get:
     *     summary: Listar promociones (con filtros)
     *     tags: [Promociones]
     *     parameters:
     *       - in: query
     *         name: tipo
     *         schema:
     *           type: string
     *           enum: [ENVIO_GRATIS, DESC_FIJO, DESC_RANDOM]
     *       - in: query
     *         name: activo
     *         schema: { type: boolean, example: true }
     *         description: Filtra por estado activo/inactivo
     *       - in: query
     *         name: vigentes
     *         schema: { type: boolean, example: true }
     *         description: Si es true, devuelve solo promociones sin expirar (expiraEl nulo o > ahora)
     *     responses:
     *       200:
     *         description: Lista de promociones
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items: { $ref: '#/components/schemas/Promocion' }
     *       400:
     *         description: Filtro inválido (p. ej., tipo no permitido)
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.get('/', (req, res) => this.controller.getPromociones(req, res));

    /**
     * @openapi
     * /promocion/{id}:
     *   get:
     *     summary: Obtener una promoción por ID
     *     tags: [Promociones]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: integer }
     *     responses:
     *       200:
     *         description: Promoción encontrada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/Promocion' }
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
    this.router.get('/:id', (req, res) => this.controller.getPromocionById(req, res));

    /**
     * @openapi
     * /promocion/{id}:
     *   patch:
     *     summary: Actualizar una promoción (parcial)
     *     tags: [Promociones]
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
     *             $ref: '#/components/schemas/UpdatePromocionDto'
     *     responses:
     *       200:
     *         description: Promoción actualizada
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "Promoción actualizada." }
     *                 promocion: { $ref: '#/components/schemas/Promocion' }
     *       400:
     *         description: Datos inválidos
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
    this.router.patch('/:id', (req, res) => this.controller.updatePromocion(req, res));

    /**
     * @openapi
     * /promocion/{id}:
     *   delete:
     *     summary: Desactivar una promoción (soft delete)
     *     tags: [Promociones]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: integer }
     *     responses:
     *       200:
     *         description: Promoción desactivada
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "Promoción desactivada (soft delete)." }
     *       404:
     *         description: Promoción no encontrada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       409:
     *         description: Ya estaba inactiva
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.delete('/:id', (req, res) => this.controller.deletePromocion(req, res));
  }
}

module.exports = PromocionRoute;
