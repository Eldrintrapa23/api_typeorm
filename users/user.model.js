"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = model;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
function model(sequelize) {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
        passwordHash: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        firstName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        lastName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        role: { type: sequelize_1.DataTypes.STRING, allowNull: true } // Optional role
    }, {
        sequelize,
        tableName: 'users',
        modelName: 'User',
        defaultScope: {
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            withHash: { attributes: { include: ['passwordHash'] } }
        }
    });
    return User;
}
