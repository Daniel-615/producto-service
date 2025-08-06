const express = require('express');
const ProductoColorController = require('../controllers/producto.color.controller.js');
const upload = require('../middleware/uploadImage.js');

class ProductoColorRoute {
  constructor(app) {
    this.router = express.Router();
    this.controller = new ProductoColorController();
    this.registerRoutes();
    app.use("/producto-service/producto-color", this.router);
  }

  registerRoutes() {
    // Crear color con imagen
    this.router.post("/", upload.single("imagen"), async (req, res) => {
      const imagenUrl = req.file ? `/uploads/${req.file.filename}` : null;
      req.body.imagenUrl = imagenUrl;
      await this.controller.createProductoColor(req, res);
    });

    // Obtener todos los colores
    this.router.get("/", (req, res) => {
      this.controller.getProductoColor(req, res);
    });

    // Obtener color por ID
    this.router.get("/:id", (req, res) => {
      this.controller.getProductoColorById(req, res);
    });

    // Actualizar color (puede incluir nueva imagen)
    this.router.put("/:id", upload.single("imagen"), async (req, res) => {
      const imagenUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
      req.body.imagenUrl = imagenUrl;
      await this.controller.updateProductoColor(req, res);
    });

    // Eliminar color
    this.router.delete("/:id", (req, res) => {
      this.controller.deleteProductoColor(req, res);
    });
  }
}

module.exports = ProductoColorRoute;
