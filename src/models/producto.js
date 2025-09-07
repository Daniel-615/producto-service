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
      peso:{
        type: DataTypes.DECIMAL(10,2),
        allowNull:true,
        validate:{
          isDecimal: true,
          min:0, 
          max: 9999.99
        }
      },
      alto: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
        validate: { min: 0 }
      },
      ancho: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
        validate: { min: 0 }
      },
      largo: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
        validate: { min: 0 }
      }
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
