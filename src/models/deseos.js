const { Model, DataTypes } = require('sequelize');

class Deseo extends Model {}

module.exports = (sequelize) => {
  Deseo.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      usuarioId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
     
      promocionId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      usosRealizados: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      estado: {
        type: DataTypes.ENUM('CREADO', 'CONSUMIDO', 'EXPIRADO'),
        defaultValue: 'CREADO'
      }
    },
    {
      sequelize,
      modelName: 'deseo',
      tableName: 'deseos',
      timestamps: true
    }
  );

  return Deseo;
};
