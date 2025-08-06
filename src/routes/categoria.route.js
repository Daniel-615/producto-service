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
    this.router.post("/", this.controller.createCategoria.bind(this.controller));

    // Obtener todas las categorías
    this.router.get("/", this.controller.getCategorias.bind(this.controller));

    // Obtener una categoría por ID
    this.router.get("/:id", this.controller.getCategoriaById.bind(this.controller));

    // Actualizar una categoría
    this.router.put("/:id", this.controller.updateCategoria.bind(this.controller));

    // Eliminar una categoría
    this.router.delete("/:id", this.controller.deleteCategoria.bind(this.controller));
  }
}

module.exports = CategoriaRoute;
