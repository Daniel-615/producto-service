const { Model } = require('sequelize');

class ProductoTalla extends Model {
  get Talla() {
    return this.Talla;
  }
  set Talla(v) {
    this.talla = v;
  }
}

module.exports = (sequelize) => {
  ProductoTalla.init({
    talla: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, 
  {
    sequelize,
    modelName: 'productoTalla',
    tableName: 'producto_talla',
    timestamps: false,
  });
  return ProductoTalla;
};
