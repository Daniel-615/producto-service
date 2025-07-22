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
    // Crear un nuevo producto
    this.router.post("/", (req, res) => {
      try {
        this.controller.createProducto(req, res);
      } catch (err) {
        console.error("Error en la ruta POST /producto:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    // Obtener todos los productos
    this.router.get("/", (req, res) => {
      try {
        this.controller.getProductos(req, res);
      } catch (err) {
        console.error("Error en la ruta GET /producto:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    // Obtener un producto por ID
    this.router.get("/:id", (req, res) => {
      try {
        this.controller.getProductoById(req, res);
      } catch (err) {
        console.error("Error en la ruta GET /producto/:id:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    // Actualizar un producto
    this.router.put("/:id", (req, res) => {
      try {
        this.controller.updateProducto(req, res);
      } catch (err) {
        console.error("Error en la ruta PUT /producto/:id:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    // Eliminar un producto
    this.router.delete("/:id", (req, res) => {
      try {
        this.controller.deleteProducto(req, res);
      } catch (err) {
        console.error("Error en la ruta DELETE /producto/:id:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });
  }
}

module.exports = ProductoRoute;
