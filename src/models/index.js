const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.js');

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
    Producto.belongsTo(Marca, { foreignKey: 'marcaId' });
    Marca.hasMany(Producto, { foreignKey: 'marcaId' });

    Producto.belongsTo(Categoria, { foreignKey: 'categoriaId' });
    Categoria.hasMany(Producto, { foreignKey: 'categoriaId' });

    Producto.belongsToMany(Talla, { through: ProductoTalla, foreignKey: 'productoId' });
    Talla.belongsToMany(Producto, { through: ProductoTalla, foreignKey: 'tallaId' });

    Producto.belongsToMany(Color, { through: ProductoColor, foreignKey: 'productoId' });
    Color.belongsToMany(Producto, { through: ProductoColor, foreignKey: 'colorId' });
  }

  get sequelize() {
    return this._sequelize;
  }

  getModel(name) {
    return this.models[name];
  }
}

module.exports = new Database();
