const { Sequelize, DataTypes } = require("sequelize");
const db = require('../db.js');

const SellerItem = db.define("seller_item", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(9, 4),
            allowNull: false
        },
        promo_price: {
            type: DataTypes.DECIMAL(9, 4),
            allowNull: true
        },
        seller_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
            references: {
                model: 'sellers',
                key: 'id'
            }
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
            references: {
                model: 'products',
                key: 'id'
            }
        },
    }
)

const Seller = db.define("seller", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        total: {
            type: DataTypes.DECIMAL(9, 4),
            allowNull: false,
            defaultValue: 0.0
        },
        discount: {
            type: DataTypes.DECIMAL(9, 4),
            allowNull: true,
            defaultValue: 0.0
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
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
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
            references: {
                model: 'users',
                key: 'id'
            }
        },
    }
)

module.exports = { Seller, SellerItem }
