
const { Model, DataTypes } = require('sequelize');

class Promocion extends Model {}

module.exports = (sequelize) => {
  Promocion.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      tipo: {
        type: DataTypes.ENUM('ENVIO_GRATIS', 'DESC_FIJO', 'DESC_RANDOM'),
        allowNull: false,
      },

      porcentaje: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: true, 
        validate: { min: 0, max: 100 }
      },
      usosMaximos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: { min: 1 }
      },

      expiraEl: {
        type: DataTypes.DATE,
        allowNull: true
      },
      metadata: {
        type: DataTypes.JSONB,
        defaultValue: {}
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      sequelize,
      modelName: 'promocion',
      tableName: 'promociones',
      timestamps: true
    }
  );
  return Promocion;
};
