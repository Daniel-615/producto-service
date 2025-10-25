const { Model, DataTypes } = require('sequelize');

class Invocar extends Model {}

module.exports = (sequelize) => {
  Invocar.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      usuarioId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
      invocar: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Invocar', 
      tableName: 'invocar',  
      timestamps: false,
    }
  );

  return Invocar;
};
