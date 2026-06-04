import express from 'express';
import cors from 'cors';
import db from './database.js'; // Import the separate database file

const app = express();
app.use(cors()); // Allow frontend to talk to this backend
app.use(express.json());

// 3. API Endpoint to Save an Order
app.post('/api/orders', (req, res) => {
    const { orderId, totalAmount, paymentMethod, items } = req.body;

    db.serialize(() => {
        // Insert the main order payment details
        db.run(`INSERT INTO orders (order_id, total_amount, payment_method) VALUES (?, ?, ?)`, 
            [orderId, totalAmount, paymentMethod], function(err) {
                if (err) return res.status(500).json({ error: err.message });
                
                // Insert every individual food item into the order_items table
                const stmt = db.prepare(`INSERT INTO order_items (order_id, item_name, quantity, price) VALUES (?, ?, ?, ?)`);
                items.forEach(item => stmt.run([orderId, item.name, item.qty, item.price]));
                stmt.finalize();

                res.json({ message: 'Order completely saved to database!', orderId });
        });
    });
});

// 4. API Endpoint to View All Orders (Go to http://localhost:3000/api/orders)
app.get('/api/orders', (req, res) => {
    db.all(`SELECT * FROM orders ORDER BY created_at DESC`, [], (err, orders) => {
        if (err) return res.status(500).json({ error: err.message });
        
        db.all(`SELECT * FROM order_items`, [], (err, items) => {
            if (err) return res.status(500).json({ error: err.message });
            
            // Group the food items with their matching order
            const fullOrders = orders.map(order => ({
                ...order,
                ordered_items: items.filter(item => item.order_id === order.order_id)
            }));
            
            res.json(fullOrders);
        });
    });
});

app.listen(3000, () => console.log(`🚀 Middleman Server running on http://localhost:3000`));