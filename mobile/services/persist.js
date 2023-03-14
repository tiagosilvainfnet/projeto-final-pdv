import * as SQLite from 'expo-sqlite';
import { get } from './request';
import { getData } from './storage';

const db = SQLite.openDatabase('mydatabase_final.db');

const createTables = async () => {
    const user = await getData('user', true);

    const result = await get('product/sync', {
        store_id: user.store_id
    })
    
    db.transaction((tx) => {
        tx.executeSql(`
            CREATE TABLE categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            );
        `);
        
        console.log("Criando tabelas")
        tx.executeSql(`
            CREATE TABLE products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                ean TEXT NOT NULL,
                price DECIMAL(9,4) NOT NULL,
                promo_price DECIMAL(9,4),
                category_id INTEGER NOT NULL,
                store_id INTEGER NOT NULL,
                UNIQUE(ean,store_id),
                FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT ON UPDATE CASCADE,
                FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE RESTRICT ON UPDATE CASCADE
            );
        `);

        for(let res of result.data.rows){
            console.log("Inserindo")
            tx.executeSql(`INSERT INTO products (id, name, ean, price, promo_price, category_id, store_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                res.id, res.name, res.ean, res.price, res.promo_price, res.category_id, res.store_id, res.createdAt, res.updatedAt
            ]);
        }

        // tx.executeSql(`SELECT * FROM products LIMIT 5`).then(([tx, results]) => {
        //     console.log(results)
        // });
    });
}

const dropTables = () => {
    db.transaction((tx) => {
        tx.executeSql('DROP TABLE IF EXISTS categories CASCADE;');
        tx.executeSql('DROP TABLE IF EXISTS products CASCADE;');
    });
    console.log("Dropado")
}

export {
    db, createTables, dropTables
}