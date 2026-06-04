import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Admin() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/api/orders')
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, []);

    const getPaymentIcon = (method) => {
        if (!method) return 'fas fa-money-bill-wave';
        if (method.toLowerCase() === 'upi') return 'fas fa-qrcode';
        if (method.toLowerCase() === 'card') return 'fas fa-credit-card';
        return 'fas fa-money-bill-wave';
    };

    return (
        <div className="app-container" style={{ display: 'block', overflowY: 'auto' }}>
            <header className="main-header">
                <div className="logo">
                    <img src="images/snpsu.png" alt="SNPSU Logo" className="logo-img" />
                    <div className="logo-text">Admin Dashboard</div>
                </div>
                <div className="header-actions">
                    <Link to="/" className="header-cart-btn" style={{ textDecoration: 'none' }}><i className="fas fa-store"></i> Back to Kiosk</Link>
                </div>
            </header>

            <main className="main-content" style={{ maxWidth: '1200px', margin: '70px auto 0' }}>
                <h2 className="section-title"><i className="fas fa-clipboard-list"></i> Recent Orders</h2>
                <div className="orders-grid">
                    {loading && <div style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--light)', padding: '50px' }}><i className="fas fa-spinner fa-spin fa-2x"></i><p style={{ marginTop: '10px' }}>Loading orders...</p></div>}
                    {error && <div style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--danger)', padding: '50px' }}>Failed to connect to the database. Make sure your server is running!</div>}
                    {!loading && !error && orders.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '50px', background: 'var(--glass)', borderRadius: '20px', backdropFilter: 'blur(12px)' }}><i className="fas fa-box-open" style={{ fontSize: '48px', color: 'rgba(0, 35, 102, 0.3)', marginBottom: '20px' }}></i><h3 style={{ color: 'var(--primary-dark)' }}>No Orders Yet</h3><p style={{ color: 'rgba(0, 35, 102, 0.7)' }}>When customers place orders, they will appear here.</p></div>}
                    {!loading && !error && orders.map(order => (
                        <div className="order-card" key={order.order_id}>
                            <div className="order-header"><div><div className="order-id">Order #CB{order.order_id}</div><div className="order-date"><i className="far fa-clock"></i> {new Date(order.created_at).toLocaleString()}</div></div><div className={`order-method ${order.payment_method.toLowerCase()}`}><i className={getPaymentIcon(order.payment_method)}></i> {order.payment_method.toUpperCase()}</div></div>
                            <div className="order-items-list">
                                {order.ordered_items.map(item => (<div className="order-item-row" key={item.id}><span>{item.quantity}x {item.item_name}</span><span>₹{item.price.toFixed(2)}</span></div>))}
                            </div>
                            <div className="order-total-row"><span>Total Paid</span><span className="total-amount">₹{order.total_amount.toFixed(2)}</span></div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}