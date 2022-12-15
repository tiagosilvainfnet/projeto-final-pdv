const { Sequelize, DataTypes } = require("sequelize");
const db = require('../db.js');

const Store = db.define("store", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        cnpj: {
            type: DataTypes.STRING(14),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        latitude: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: true
        },
        longitude: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    }
)

module.exports = { Store }
