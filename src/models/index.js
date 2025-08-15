const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.js');
const productoColor = require('./productoColor.js');

class Database {
  constructor() {
    this._sequelize = new Sequelize(
      dbConfig.DB,
      dbConfig.USER,
      dbConfig.PASSWORD,
      {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: dbConfig.dialect,
        pool: dbConfig.pool,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        },
        logging: false
      }
    );

    this.Sequelize = Sequelize;
    this.models = {};

    this._loadModels();
    this._associateModels();
  }

  _loadModels() {
    const sequelize = this._sequelize;


    // Catálogos y productos
    this.models.Marca = require('./marca.js')(sequelize);
    this.models.Categoria = require('./categoria.js')(sequelize);
    this.models.Producto = require('./producto.js')(sequelize);
    this.models.Talla = require('./talla.js')(sequelize);
    this.models.Color = require('./color.js')(sequelize);
    this.models.ProductoTalla = require('./productoTalla.js')(sequelize);
    this.models.ProductoColor = require('./productoColor.js')(sequelize);
  }

  _associateModels() {
    const {
      Marca, Categoria, Producto, Talla, Color,
      ProductoTalla, ProductoColor
    } = this.models;

    // Relaciones Producto
    Producto.belongsTo(Marca, { foreignKey: 'marcaId', as: 'marca' });
    Marca.hasMany(Producto, { foreignKey: 'marcaId', as: 'productos' });

    Producto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
    Categoria.hasMany(Producto, { foreignKey: 'categoriaId', as: 'productos' });

    // Relación directa con ProductoTalla
    Producto.hasMany(ProductoTalla, { foreignKey: 'productoId', as: 'productoTallas' });
    ProductoTalla.belongsTo(Producto, { foreignKey: 'productoId', as: 'producto' });

    Talla.hasMany(ProductoTalla, { foreignKey: 'tallaId', as: 'productoTallas' });
    ProductoTalla.belongsTo(Talla, { foreignKey: 'tallaId', as: 'tallaInfo' });

    Producto.belongsToMany(Color, { through: ProductoColor, foreignKey: 'productoId' });
    Color.belongsToMany(Producto, { through: ProductoColor, foreignKey: 'colorId' });

    //Producto con color
    Producto.hasMany(ProductoColor,{foreignKey: 'productoId', as : 'productoColores'})
    ProductoColor.belongsTo(Producto,{ foreignKey: 'productoId', as: 'producto'})

    //Color del producto (hexadecimal)
    Color.hasMany(ProductoColor, {foreignKey: 'colorId', as: 'productoColores'})
    ProductoColor.belongsTo(Color, {foreignKey: 'colorId', as: 'colorInfo'})
  }

  get sequelize() {
    return this._sequelize;
  }

  getModel(name) {
    return this.models[name];
  }
}

module.exports = new Database();
