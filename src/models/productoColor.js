const { Model, DataTypes } = require('sequelize');

class ProductoColor extends Model {
  get ImagenUrl() {
    return this.imagenUrl;
  }

  set ImagenUrl(url) {
    this.imagenUrl = url;
  }
}

module.exports = (sequelize) => {
  ProductoColor.init(
    {
      imagenUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'productoColor',
      tableName: 'producto_color',
      timestamps: false,
    }
  );
  return ProductoColor;
};
