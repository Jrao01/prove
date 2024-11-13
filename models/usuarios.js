const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                nombre: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                tel: {
                    type: DataTypes.STRING,
                    allowNull: false, 
                },
                correo: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                contrasena: {
                    type: DataTypes.STRING,
                    allowNull: false,
                }
            },
            {
                sequelize,
                tableName: 'usuarios',
            }
        );
    }
}

User.init(sequelize, DataTypes);

module.exports = User;