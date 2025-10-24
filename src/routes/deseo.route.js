const express = require('express');
const DeseoController = require('../controllers/deseo.controller');

class DeseoRoute {
  constructor(app) {
    this.router = express.Router();
    this.controller = new DeseoController(); 
    this.registerRoutes();
    app.use('/producto-service/deseo', this.router);
  }

  registerRoutes() {
    this.router.post(
      '/usuarios/:usuarioId/deseos',
      (req, res) => this.controller.createDeseo(req, res)
    );

 
    this.router.get(
      '/deseos',
      (req, res) => this.controller.getDeseos(req, res)
    );


    this.router.patch(
      '/deseos/:id/consumir',
      (req, res) => this.controller.consumeDeseo(req, res)
    );

    this.router.delete(
      '/deseos/:id',
      (req, res) => this.controller.deleteDeseo(req, res)
    );
  }
}

module.exports = DeseoRoute;
