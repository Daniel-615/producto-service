const express = require('express');
const ColorController = require('../controllers/color.controller.js');

class ColorRoute {
  constructor(app) {
    this.router = express.Router();
    this.controller = new ColorController();
    this.registerRoutes();
    app.use("/producto-service/color", this.router);
  }

  registerRoutes() {
    // Crear un nuevo color
    this.router.post("/", (req, res) => {
      try {
        this.controller.createColor(req, res);
      } catch (err) {
        console.error("Error en la ruta POST /color:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    // Obtener todos los colores
    this.router.get("/", (req, res) => {
      try {
        this.controller.getColores(req, res);
      } catch (err) {
        console.error("Error en la ruta GET /color:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    // Obtener un color por ID
    this.router.get("/:id", (req, res) => {
      try {
        this.controller.getColoresById(req, res);
      } catch (err) {
        console.error("Error en la ruta GET /color/:id:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    // Actualizar un color
    this.router.put("/:id", (req, res) => {
      try {
        this.controller.updateColores(req, res);
      } catch (err) {
        console.error("Error en la ruta PUT /color/:id:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    // Eliminar un color
    this.router.delete("/:id", (req, res) => {
      try {
        this.controller.deleteCategoria(req, res);
      } catch (err) {
        console.error("Error en la ruta DELETE /color/:id:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });
  }
}

module.exports = ColorRoute;
