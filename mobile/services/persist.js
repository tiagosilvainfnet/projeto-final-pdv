import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydatabase_final.db');

const createTables = () => {
    db.transaction((tx) => {
        tx.executeSql(`
            CREATE TABLE categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            );
        `);
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
    });
}

const dropTables = () => {
    db.transaction((tx) => {
        tx.executeSql('DROP TABLE IF EXISTS categories CASCADE;');
        tx.executeSql('DROP TABLE IF EXISTS products CASCADE;');
    });
    console.log("Dropado")
}

const execute = async (query, params) => {
    try{
        return await new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(query, params, (tx, result) => {
                    resolve(result);
                }, (tx, err) => {
                    reject(err);
                })
            })
        })
    }catch(err){
        console.log(err);
    }
}

export {
    db, execute, createTables, dropTables
}