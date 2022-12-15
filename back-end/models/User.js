const { Sequelize, DataTypes } = require("sequelize");
const db = require('../db.js');

const User = db.define("user", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(80),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        store_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
            references: {
                model: 'stores',
                key: 'id'
            }
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
            references: {
                model: 'roles',
                key: 'id'
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    }
)

module.exports = { User }
