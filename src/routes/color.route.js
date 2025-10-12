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

    this.router.post("/", this.controller.createColor.bind(this.controller));

    this.router.get("/", this.controller.getColores.bind(this.controller));


    this.router.get("/:id", this.controller.getColoresById.bind(this.controller));


    this.router.put("/:id", this.controller.updateColores.bind(this.controller));

  }
}

module.exports = ColorRoute;
