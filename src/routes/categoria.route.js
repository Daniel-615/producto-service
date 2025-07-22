const express = require('express');
const CategoriaController = require('../controllers/categoria.controller.js');

class CategoriaRoute {
  constructor(app) {
    this.router = express.Router();
    this.controller = new CategoriaController();
    this.registerRoutes();
    app.use("/producto-service/categoria", this.router);
  }

  registerRoutes() {
    // Crear una nueva categoría
    this.router.post("/", (req, res) => {
      try {
        this.controller.createCategoria(req, res);
      } catch (err) {
        console.error("Error en la ruta POST /categoria:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    // Obtener todas las categorías
    this.router.get("/", (req, res) => {
      try {
        this.controller.getCategorias(req, res);
      } catch (err) {
        console.error("Error en la ruta GET /categoria:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    // Obtener una categoría por ID
    this.router.get("/:id", (req, res) => {
      try {
        this.controller.getCategoriaById(req, res);
      } catch (err) {
        console.error("Error en la ruta GET /categoria/:id:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    // Actualizar una categoría
    this.router.put("/:id", (req, res) => {
      try {
        this.controller.updateCategoria(req, res);
      } catch (err) {
        console.error("Error en la ruta PUT /categoria/:id:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    // Eliminar una categoría
    this.router.delete("/:id", (req, res) => {
      try {
        this.controller.deleteCategoria(req, res);
      } catch (err) {
        console.error("Error en la ruta DELETE /categoria/:id:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });
  }
}

module.exports = CategoriaRoute;
