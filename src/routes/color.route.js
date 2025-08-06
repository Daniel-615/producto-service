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
    this.router.post("/", this.controller.createColor.bind(this.controller));

    // Obtener todos los colores
    this.router.get("/", this.controller.getColores.bind(this.controller));

    // Obtener un color por ID
    this.router.get("/:id", this.controller.getColoresById.bind(this.controller));

    // Actualizar un color
    this.router.put("/:id", this.controller.updateColores.bind(this.controller));

  }
}

module.exports = ColorRoute;
