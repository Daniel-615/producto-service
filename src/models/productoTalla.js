const { Model } = require('sequelize');

class ProductoTalla extends Model {}

module.exports = (sequelize) => {
  ProductoTalla.init({}, {
    sequelize,
    modelName: 'productoTalla',
    tableName: 'producto_talla',
    timestamps: false,
  });
  return ProductoTalla;
};
