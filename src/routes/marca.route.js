const express = require('express');
const MarcaController = require('../controllers/marca.controller.js');

class MarcaRoute {
  constructor(app) {
    this.router = express.Router();
    this.controller = new MarcaController();
    this.registerRoutes();
    app.use("/producto-service/marca", this.router);
  }

  registerRoutes() {
    // Crear una nueva marca
    this.router.post("/", this.controller.createMarca.bind(this.controller));

    // Obtener todas las marcas
    this.router.get("/", this.controller.getMarcas.bind(this.controller));

    // Obtener marca por ID
    this.router.get("/:id", this.controller.getMarcaById.bind(this.controller));

    // Actualizar marca
    this.router.put("/:id", this.controller.updateMarca.bind(this.controller));

    // Eliminar marca
    this.router.delete("/:id", this.controller.deleteMarca.bind(this.controller));
  }
}

module.exports = MarcaRoute;
