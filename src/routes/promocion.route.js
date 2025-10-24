const express = require('express');
const PromocionController = require('../controllers/promocion.controller');

class PromocionRoute {
  constructor(app) {
    this.router = express.Router();
    this.controller = new PromocionController(); 
    this.registerRoutes();
    app.use("/producto-service/promocion", this.router);
  }

  registerRoutes() {
    this.router.post('/', (req, res) => this.controller.createPromocion(req, res));
    this.router.get('/', (req, res) => this.controller.getPromociones(req, res));
    this.router.get('/:id', (req, res) => this.controller.getPromocionById(req, res));
    this.router.patch('/:id', (req, res) => this.controller.updatePromocion(req, res));
    this.router.delete('/:id', (req, res) => this.controller.deletePromocion(req, res));
  }
}

module.exports = PromocionRoute;
