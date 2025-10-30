const express = require("express");
const cloudinary = require("cloudinary").v2;
const ProductoColorController = require("../controllers/producto.color.controller.js");
const upload = require("../middleware/uploadImage.js");

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

class ProductoColorRoute {
  constructor(app) {
    this.router = express.Router();
    this.controller = new ProductoColorController();
    this.registerRoutes();
    app.use("/producto-service/producto-color", this.router);
  }

  registerRoutes() {
    /**
     * @openapi
     * tags:
     *   - name: ProductoColor
     *     description: Gestión de variantes de producto por color con imagen (Cloudinary)
     */

    /**
     * @openapi
     * /producto-color:
     *   post:
     *     summary: Crear relación producto-color con imagen
     *     description: Sube la imagen a Cloudinary y crea el registro asociado al producto y color.
     *     tags: [ProductoColor]
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             required: [productoId, colorId, imagen]
     *             properties:
     *               productoId:
     *                 type: integer
     *                 example: 101
     *               colorId:
     *                 type: integer
     *                 example: 5
     *               imagen:
     *                 type: string
     *                 format: binary
     *                 description: Archivo de imagen a subir (jpeg/png/webp).
     *     responses:
     *       201:
     *         description: ProductoColor creado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "ProductoColor creado exitosamente." }
     *                 data: { $ref: '#/components/schemas/ProductoColor' }
     *       400:
     *         description: Validación fallida o error al subir imagen
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.post("/", upload.single("imagen"), async (req, res) => {
      try {
        let imagenUrl = null;

        if (req.fileValidationError) {
          return res.status(400).send({ message: req.fileValidationError });
        }

        if (req.file) {
          const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                public_id: req.file.originalname.split(".")[0],
                tags: "producto_color"
              },
              (error, result) => (error ? reject(error) : resolve(result))
            );
            stream.end(req.file.buffer);
          });

          imagenUrl = uploadResult.secure_url;
        }

        if (!imagenUrl) {
          return res.status(400).send({ message: "No se pudo guardar la imagen en Cloudinary" });
        }

        req.body.imagenUrl = imagenUrl;
        await this.controller.createProductoColor(req, res);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error al subir imagen a Cloudinary" });
      }
    });

    /**
     * @openapi
     * /producto-color:
     *   get:
     *     summary: Listar todas las variantes producto-color
     *     tags: [ProductoColor]
     *     responses:
     *       200:
     *         description: Lista de variantes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items: { $ref: '#/components/schemas/ProductoColor' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.get("/", (req, res) => this.controller.getProductoColor(req, res));

    /**
     * @openapi
     * /producto-color/{id}:
     *   get:
     *     summary: Obtener una variante producto-color por ID
     *     tags: [ProductoColor]
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
     *             schema: { $ref: '#/components/schemas/ProductoColor' }
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
    this.router.get("/:id", (req, res) => this.controller.getProductoColorById(req, res));

    /**
     * @openapi
     * /producto-color/{id}:
     *   put:
     *     summary: Actualizar una variante (con o sin nueva imagen)
     *     description: Si se envía `imagen`, se sube a Cloudinary y se actualiza `imagenUrl`.
     *     tags: [ProductoColor]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: integer }
     *     requestBody:
     *       required: false
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               productoId:
     *                 type: integer
     *                 example: 101
     *               colorId:
     *                 type: integer
     *                 example: 6
     *               imagen:
     *                 type: string
     *                 format: binary
     *                 description: Nueva imagen (opcional)
     *     responses:
     *       200:
     *         description: Variante actualizada
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "ProductoColor actualizado correctamente." }
     *                 data: { $ref: '#/components/schemas/ProductoColor' }
     *       404:
     *         description: No encontrada
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error al actualizar
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.put("/:id", upload.single("imagen"), async (req, res) => {
      try {
        let imagenUrl = undefined;

        if (req.file) {
          const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                public_id: req.file.originalname.split(".")[0],
                tags: "producto_color"
              },
              (error, result) => (error ? reject(error) : resolve(result))
            );
            stream.end(req.file.buffer);
          });

          imagenUrl = uploadResult.secure_url;
        }

        req.body.imagenUrl = imagenUrl;
        await this.controller.updateProductoColor(req, res);
      } catch (err) {
        console.error("Error al actualizar imagen en Cloudinary:", err.message);
        res.status(500).send({ message: "Error al actualizar imagen en Cloudinary" });
      }
    });

    /**
     * @openapi
     * /producto-color/{id}:
     *   delete:
     *     summary: Eliminar variante producto-color
     *     tags: [ProductoColor]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: integer }
     *     responses:
     *       200:
     *         description: Eliminado correctamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: { type: string, example: "ProductoColor eliminado exitosamente." }
     *       404:
     *         description: No encontrado
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     *       500:
     *         description: Error del servidor
     *         content:
     *           application/json:
     *             schema: { $ref: '#/components/schemas/ErrorResponse' }
     */
    this.router.delete("/:id", (req, res) => this.controller.deleteProductoColor(req, res));
  }
}

module.exports = ProductoColorRoute;
