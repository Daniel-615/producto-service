const { Model, DataTypes } = require('sequelize');

class Producto extends Model {
}

module.exports = (sequelize) => {
  Producto.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'producto',
      tableName: 'productos',
      timestamps: true,
    }
  );
  return Producto;
};
