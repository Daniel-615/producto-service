const express= require('express');
const InvocarController=require("../controllers/invocar.controller");

class InvocarRoute{
  constructor(app){
    this.router= express.Router();
    this.controller=new InvocarController();
    this.registerRoutes();
    app.use('/producto-service/invocar', this.router);
  }

  registerRoutes(){
    /**
     * @openapi
     * tags:
     *   - name: Invocar
     *     description: Controla el flag de invocación por usuario (Shenron Wish)
     */

    /**
     * @openapi
     * /invocar:
     *   post:
     *     summary: Crear registro de invocación para un usuario
     *     tags: [Invocar]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateInvocarDto'
     *     responses:
     *       201:
     *         description: Invocación creada
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success: { type: boolean, example: true }
     *                 message: { type: string, example: "Invocación creada exitosamente." }
     *       400:
     *         description: Falta usuarioId
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       409:
     *         description: Ya existe invocación para ese usuario
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error de servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.post('/', (req, res) => this.controller.createInvocar(req, res));

    /**
     * @openapi
     * /invocar/{usuarioId}:
     *   patch:
     *     summary: Modificar estado de invocación (true/false) por usuario
     *     tags: [Invocar]
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
     *             $ref: '#/components/schemas/UpdateInvocarDto'
     *     responses:
     *       200:
     *         description: Invocación modificada
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success: { type: boolean, example: true }
     *                 message:
     *                   type: string
     *                   example: "Invocación modificada exitosamente. Estado: true"
     *       400:
     *         description: Falta usuarioId o body.invocar
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       404:
     *         description: Invocación no encontrada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error de servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.patch('/:usuarioId', (req, res) => this.controller.modifyInvocar(req, res));

    /**
     * @openapi
     * /invocar/{usuarioId}:
     *   get:
     *     summary: Obtener el registro de invocación por usuario
     *     tags: [Invocar]
     *     parameters:
     *       - in: path
     *         name: usuarioId
     *         required: true
     *         schema: { type: integer }
     *     responses:
     *       200:
     *         description: Registro encontrado
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success: { type: boolean, example: true }
     *                 data: { $ref: '#/components/schemas/Invocar' }
     *       400:
     *         description: Falta usuarioId
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       404:
     *         description: No existe registro para ese usuario
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error de servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.get('/:usuarioId', (req, res) => this.controller.getInvocar(req, res));
  }
}

module.exports = InvocarRoute;
