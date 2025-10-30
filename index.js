// server.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const { PORT, FRONTEND_URL, BACKEND_URL } = require('./src/config/config.js');
const db = require('./src/models');

// === Scalar / OpenAPI ===
const swaggerJsdoc = require('swagger-jsdoc');
const { apiReference } = require('@scalar/express-api-reference');

const TallaRoute = require('./src/routes/talla.route.js');
const MarcaRoute = require('./src/routes/marca.route.js');
const CategoriaRoute = require('./src/routes/categoria.route.js');
const ProductoRoute = require('./src/routes/producto.route.js');
const ColorRoute = require('./src/routes/color.route.js');
const ProductoTallaColorRoute = require('./src/routes/producto.talla.color.route.js');
const ProductoColorRoute = require('./src/routes/producto.color.route.js');
const DeseoRoute = require('./src/routes/deseo.route.js');
const PromocionRoute = require('./src/routes/promocion.route.js');
const InvocarRoute = require('./src/routes/invocar.route.js');

class Server {
  constructor() {
    this.app = express();
    this.port = PORT;

    // Middlewares base
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.configureMiddlewares();
    this.configureOpenAPI();
    this.configureRoutes();
    this.connectDatabase();
  }

  configureMiddlewares() {
    this.app.use(cors({
      origin: [FRONTEND_URL, BACKEND_URL],
      credentials: true,
      methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Set-Cookie']
    }));

    // estáticos (imágenes)
    this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  }

  configureOpenAPI() {
    const openapiDefinition = {
      openapi: '3.0.3',
      info: {
        title: 'Producto Service',
        version: '1.0.0',
        description: 'API del microservicio de productos (categorías, marcas, tallas, colores, etc.)',
      },
      servers: [
        // Usa el path base del microservicio si lo publicas detrás de un gateway:
        { url: `http://localhost:${this.port}/producto-service`, description: 'Local' },
      ],
      components: {
        securitySchemes: {
          bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
          cookieAuth: { type: 'apiKey', in: 'cookie', name: 'access_token' },
        },
        // Puedes definir esquemas globales si quieres (opcional).
        schemas: {
          MessageResponse: {
            type: 'object',
            properties: { message: { type: 'string', example: 'Operación realizada correctamente.' } }
          },
          ErrorResponse: {
            type: 'object',
            properties: { message: { type: 'string', example: 'Descripción del error.' } }
          }
        }
      },
      // Si quieres forzar auth por cookie a todo:
      // security: [{ cookieAuth: [] }],
    };

    const openapi = swaggerJsdoc({
      definition: openapiDefinition,
      apis: [
        './src/routes/**/*.js',
        './src/routes/*.js',
        // si defines esquemas en otros archivos, agrégalos aquí
      ],
    });

    // JSON del spec
    this.app.get('/openapi.json', (_req, res) => res.json(openapi));

    // UI de Scalar
    this.app.use('/docs', apiReference({
      url: '/openapi.json',
      theme: 'purple',
      layout: 'modern',
    }));

    // health check simple (útil también para monitoreo)
    this.app.get('/health', (_req, res) => res.json({ status: 'ok' }));
  }

  configureRoutes() {
    new TallaRoute(this.app);
    new MarcaRoute(this.app);
    new CategoriaRoute(this.app);
    new ProductoRoute(this.app);
    new ColorRoute(this.app);
    new ProductoTallaColorRoute(this.app);
    new ProductoColorRoute(this.app);
    new DeseoRoute(this.app);
    new PromocionRoute(this.app);
    new InvocarRoute(this.app);
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
      console.log(`Docs:  http://localhost:${this.port}/docs`);
      console.log(`Spec:  http://localhost:${this.port}/openapi.json`);
    });
  }
}

const server = new Server();
server.start();
