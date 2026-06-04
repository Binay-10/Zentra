import sqlite3pkg from 'sqlite3';
const sqlite3 = sqlite3pkg.verbose();

const db = new sqlite3.Database('./kiosk.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('✅ Connected to local SQLite database file.');
    }
});

db.serialize(() => {

    // Create the main orders table
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            order_id TEXT PRIMARY KEY,
            total_amount REAL NOT NULL,
            payment_method TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) console.error("❌ Error creating orders table:", err.message);
    });

    // Create the order_items table to store individual food items
    db.run(`
        CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id TEXT NOT NULL,
            item_name TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            price REAL NOT NULL,
            FOREIGN KEY(order_id) REFERENCES orders(order_id)
        )
    `, (err) => {
        if (err) console.error("❌ Error creating order_items table:", err.message);
    });

    console.log("✅ Tables created successfully.");
});

export default db;