const { Model, DataTypes } = require('sequelize');

class ProductoColor extends Model {
  get Color() {
    return this.Color;
  }
  set Color(v) {
    this.color = v;
  }

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
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
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
