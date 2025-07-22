const { Model, DataTypes } = require('sequelize');

class Talla extends Model {
  get Valor() {
    return this.valor;
  }

  set Valor(v) {
    this.valor = v;
  }
}

module.exports = (sequelize) => {
  Talla.init(
    {
      valor: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'talla',
      tableName: 'tallas',
      timestamps: false,
    }
  );
  return Talla;
};
