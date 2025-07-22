const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { APP_PORT,FRONTEND_URL } = require('./src/config/config.js')
const db = require('./src/models'); 
const CategoriaRoute = require('./src/routes/categoria.route.js');
const ProductoRoute = require('./src/routes/producto.route.js');
const MarcaRoute = require('./src/routes/marca.route.js');
const ColorRoute = require('./src/routes/color.route.js');
const ProductoTallaRoute = require('./src/routes/productoTalla.route.js');
const ProductoColorRoute = require('./src/routes/productoColor.route.js');
const TallaRoute = require('./src/routes/talla.route.js');

class Server {
  constructor() {
    this.app = express();
    this.port = APP_PORT;
    this.app.use(express.json()); // Middleware para parsear JSON
    this.configureMiddlewares();
    this.configureRoutes();
    this.connectDatabase();
  }

  configureMiddlewares() {
    this.app.use(cors({
      origin: FRONTEND_URL,
      credentials: true // Permitir cookies y credenciales
    }));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
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
      await db.sequelize.sync({alter: true}); // o sync({ force: true }) si estás en desarrollo
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
