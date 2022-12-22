const { Sequelize, DataTypes } = require("sequelize");
const db = require('../db.js');

const Category = db.define("category", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        store_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
            references: {
                model: 'stores',
                key: 'id'
            }
        },
    }
)

module.exports = { Category }
