const {Model, DataTypes} = require('sequelize');
class Invocar extends Model {

}
module.exports=(sequelize)=>{
    Invocar.init(
        {
            id:{
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            usuarioId:{
                type:DataTypes.UUID,
                allowNull: false,
                unique: true
            },
            invocar:{
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }
    ),
    {
        sequelize,
        modelName: 'invocar',
        tableName: 'invocar',
        timestamps: false
    }
    return Invocar;
}