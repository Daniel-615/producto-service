const { Model, DataTypes } = require('sequelize');

class Producto extends Model {
  get Nombre() {
    return this.nombre;
  }
  set Nombre(v) {
    this.nombre = v;
  }

  get Descripcion() {
    return this.descripcion;
  }
  set Descripcion(v) {
    this.descripcion = v;
  }

  get Precio() {
    return this.precio;
  }
  set Precio(v) {
    this.precio = v;
  }

  get Stock() {
    return this.stock;
  }
  set Stock(v) {
    this.stock = v;
  }
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
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
