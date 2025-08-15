const express = require('express');
const cors = require('cors');
const path = require('path');
const { APP_PORT, FRONTEND_URL } = require('./src/config/config.js');
const db = require('./src/models'); 

// Rutas
const CategoriaRoute = require('./src/routes/categoria.route.js');
const ProductoRoute = require('./src/routes/producto.route.js');
const MarcaRoute = require('./src/routes/marca.route.js');
const ColorRoute = require('./src/routes/color.route.js');
const ProductoTallaRoute = require('./src/routes/producto.talla.route.js');
const ProductoColorRoute = require('./src/routes/producto.color.route.js');
const TallaRoute = require('./src/routes/talla.route.js');

class Server {
  constructor() {
    this.app = express();
    this.port = APP_PORT;

    // Middlewares principales
    this.app.use(express.json()); 
    this.app.use(express.urlencoded({ extended: true })); 
    this.configureMiddlewares();
    this.configureRoutes();
    this.connectDatabase();
  }

  configureMiddlewares() {
    this.app.use(cors({
      origin: FRONTEND_URL,
      credentials: true 
    }));

    // Carpeta para servir imágenes
    this.app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  }

  configureRoutes() {
    new TallaRoute(this.app);
    new MarcaRoute(this.app);
    new CategoriaRoute(this.app);
    new ProductoRoute(this.app);
    new ColorRoute(this.app);
    new ProductoTallaRoute(this.app);
    new ProductoColorRoute(this.app);
  }

  async connectDatabase() {
    try {
      await db.sequelize.sync({ alter: true });
      console.log('Base de datos conectada y sincronizada.');

      const tables = await db.sequelize.getQueryInterface().showAllTables();
      console.log('Tablas en la base de datos:', tables);
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
    }
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

const server = new Server();
server.start();
