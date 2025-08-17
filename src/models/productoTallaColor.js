const { Model, DataTypes } = require('sequelize');

class ProductoTallaColor extends Model {
}

module.exports = (sequelize) => {
  ProductoTallaColor.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement: true
    },
    id_talla:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'tallas',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    id_producto_color:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'producto_color',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, 
  {
    sequelize,
    modelName: 'productoTallaColor',
    tableName: 'producto_talla_color',
    timestamps: false,
  });
  return ProductoTallaColor;
};