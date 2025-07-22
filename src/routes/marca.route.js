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
    this.router.post("/", (req, res) => {
      try {
        this.controller.createMarca(req, res);
      } catch (err) {
        console.error("Error en la ruta POST /marca:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    // Obtener todas las marcas
    this.router.get("/", (req, res) => {
      try {
        this.controller.getMarcas(req, res);
      } catch (err) {
        console.error("Error en la ruta GET /marca:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    // Obtener marca por ID
    this.router.get("/:id", (req, res) => {
      try {
        this.controller.getMarcaById(req, res);
      } catch (err) {
        console.error("Error en la ruta GET /marca/:id:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    // Actualizar marca
    this.router.put("/:id", (req, res) => {
      try {
        this.controller.updateMarca(req, res);
      } catch (err) {
        console.error("Error en la ruta PUT /marca/:id:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });

    // Eliminar marca
    this.router.delete("/:id", (req, res) => {
      try {
        this.controller.deleteMarca(req, res);
      } catch (err) {
        console.error("Error en la ruta DELETE /marca/:id:", err);
        res.status(500).json({ error: "Error en el servidor" });
      }
    });
  }
}

module.exports = MarcaRoute;
