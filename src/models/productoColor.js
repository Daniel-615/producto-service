const { Model, DataTypes } = require('sequelize');

class ProductoColor extends Model {
  get Color() {
    return this.color; // corregido para evitar recursión infinita
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
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'producto', // nombre de la tabla de productos
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      imagenUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'ProductoColor',
      tableName: 'producto_color',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['productoId', 'colorId'], 
        },
      ],
    }
  );

  ProductoColor.associate = (models) => {
    ProductoColor.belongsTo(models.Producto, {
      foreignKey: 'productoId',
      as: 'producto',
    });
  };

  return ProductoColor;
};
