const express = require('express');
const ProductoColorController = require('../controllers/producto.color.controller.js');

class ProductoColorRoute {
  constructor(app) {
    this.router = express.Router();
    this.controller = new ProductoColorController();
    this.registerRoutes();
    app.use("/producto-service/producto-color", this.router);
  }

  registerRoutes() {
    this.router.post("/", (req, res) => {
      try {
        this.controller.createProductoColor(req, res);
      } catch (err) {
        console.error("Error en POST /producto-color:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    this.router.get("/", (req, res) => {
      try {
        this.controller.getProductoColor(req, res);
      } catch (err) {
        console.error("Error en GET /producto-color:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    this.router.get("/:id", (req, res) => {
      try {
        this.controller.getProductoColorById(req, res);
      } catch (err) {
        console.error("Error en GET /producto-color/:id:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    this.router.put("/:id", (req, res) => {
      try {
        this.controller.updateProductoColor(req, res);
      } catch (err) {
        console.error("Error en PUT /producto-color/:id:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    this.router.delete("/:id", (req, res) => {
      try {
        this.controller.deleteProductoColor(req, res);
      } catch (err) {
        console.error("Error en DELETE /producto-color/:id:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });
  }
}

module.exports = ProductoColorRoute;
