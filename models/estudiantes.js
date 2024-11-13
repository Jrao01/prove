const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Student extends Model {
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
                carrera_Id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                status_Id:{
                    type: DataTypes.INTEGER,
                    defaultValue : 1
                }
            },
            {
                sequelize,
                tableName: 'Student',
            }
        );
    }
}

Student.init(sequelize, DataTypes);

module.exports = Student;