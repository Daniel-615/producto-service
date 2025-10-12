const express = require('express');
const ProductoTallaColorController = require('../controllers/producto.talla.color.controller.js');

class ProductoTallaRoute {
  constructor(app) {
    this.router = express.Router();
    this.controller = new ProductoTallaColorController();
    this.registerRoutes();
    app.use("/producto-service/producto-talla", this.router);
  }

  registerRoutes() {
    this.router.post("/", this.controller.createProductoTalla.bind(this.controller));
    this.router.get("/", this.controller.getProductoTalla.bind(this.controller));
    this.router.get("/:id", this.controller.getProductoTallaById.bind(this.controller));
    this.router.put("/:id", this.controller.updateProductoTalla.bind(this.controller));
    this.router.post("/:id/decrement",this.controller.decrementStock.bind(this.controller));
    this.router.delete("/:id", this.controller.deleteProductoTalla.bind(this.controller));
  }
}

module.exports = ProductoTallaRoute;
