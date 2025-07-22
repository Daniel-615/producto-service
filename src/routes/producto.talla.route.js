const express = require('express');
const ProductoTallaController = require('../controllers/producto.talla.controller.js');

class ProductoTallaRoute {
  constructor(app) {
    this.router = express.Router();
    this.controller = new ProductoTallaController();
    this.registerRoutes();
    app.use("/producto-service/producto-talla", this.router);
  }

  registerRoutes() {
    this.router.post("/", (req, res) => {
      try {
        this.controller.createProductoTalla(req, res);
      } catch (err) {
        console.error("Error en POST /producto-talla:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    this.router.get("/", (req, res) => {
      try {
        this.controller.getProductoTalla(req, res);
      } catch (err) {
        console.error("Error en GET /producto-talla:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    this.router.get("/:id", (req, res) => {
      try {
        this.controller.getProductoTallaById(req, res);
      } catch (err) {
        console.error("Error en GET /producto-talla/:id:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    this.router.put("/:id", (req, res) => {
      try {
        this.controller.updateProductoTalla(req, res);
      } catch (err) {
        console.error("Error en PUT /producto-talla/:id:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    this.router.delete("/:id", (req, res) => {
      try {
        this.controller.deleteProductoTalla(req, res);
      } catch (err) {
        console.error("Error en DELETE /producto-talla/:id:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });
  }
}

module.exports = ProductoTallaRoute;
