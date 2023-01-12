const { Sequelize, DataTypes } = require("sequelize");
const db = require('../db.js');

const Client = db.define("client", 
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
        cpf: {
            type: DataTypes.STRING(11),
            allowNull: false
        },
    }
)
const ClientStore = db.define("client_store", {
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        references: {
            model: 'clients',
            key: 'id'
        }
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
});
// todo criar table de loja e cliente

module.exports = { Client, ClientStore }
