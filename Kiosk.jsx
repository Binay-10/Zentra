import React, { useState, useEffect, useMemo } from 'react';
import { foodItems } from './data';
import { handleImageError } from './utils';
import CartModal from './CartModal';
import PaymentModal from './PaymentModal';
import SuccessModal from './SuccessModal';

export default function Kiosk() {
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('campusbite_cart')) || []);
    const [category, setCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [notification, setNotification] = useState({ show: false, text: '' });
    const [completedOrder, setCompletedOrder] = useState(null);

    // Session Timer
    useEffect(() => {
        if (timeLeft <= 0) {
            alert('Session expired! Please start a new order.');
            setCart([]);
            setTimeLeft(300);
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // LocalStorage sync
    useEffect(() => {
        localStorage.setItem('campusbite_cart', JSON.stringify(cart));
    }, [cart]);

    const categories = [
        { id: 'all', label: 'All' }, { id: 'breakfast', label: 'Breakfast' },
        { id: 'rice', label: 'Rice' }, { id: 'meal', label: 'Meals' },
        { id: 'snack', label: 'Snacks' }, { id: 'beverage', label: 'Drinks' }, { id: 'dessert', label: 'Desserts' }
    ];

    const filteredFoods = useMemo(() => {
        return foodItems.filter(item => {
            const matchesCat = category === 'all' || item.category === category;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCat && matchesSearch;
        }).sort((a, b) => a.name.localeCompare(b.name));
    }, [category, searchQuery]);

    const bill = useMemo(() => {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const cgst = subtotal * 0.025;
        const sgst = subtotal * 0.025;
        const discount = subtotal > 200 ? subtotal * 0.10 : 0;
        const total = (subtotal + cgst + sgst) - discount;
        return { subtotal, cgst, sgst, discount, total };
    }, [cart]);

    const showNotification = (text) => {
        setNotification({ show: true, text });
        setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 3000);
    };

    const addToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(c => c.id === item.id);
            if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
            return [...prev, { ...item, qty: 1 }];
        });
        showNotification(`${item.name} added to cart`);
    };

    const updateQuantity = (id, change) => {
        setCart(prev => prev.map(c => c.id === id ? { ...c, qty: c.qty + change } : c).filter(c => c.qty > 0));
    };

    const handlePaymentSuccess = (method, billDetails) => {
        const newOrderId = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        setCompletedOrder({ id: newOrderId, method, bill: billDetails, cart: [...cart] });

        // Post to your actual backend server exactly as vanilla JS did
        fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: newOrderId, totalAmount: billDetails.total, paymentMethod: method, items: cart })
        }).then(res => res.json()).then(data => console.log("✅ Order saved:", data)).catch(err => console.error("❌ Database error:", err));

        setIsPaymentOpen(false);
        showNotification('Payment successfully done! ✅');
        setTimeout(() => setIsSuccessOpen(true), 800);
    };

    const resetApp = () => {
        setCart([]);
        setIsSuccessOpen(false);
        setTimeLeft(300);
        showNotification('Ready for new order!');
    };

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const formatTime = (seconds) => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

    return (
        <div className="app-container">
            <div className="main-area">
                <header className="main-header">
                    <div className="logo"><img src="images/snpsu.png" alt="SNPSU" className="logo-img" /><div className="logo-text">SNPSU</div></div>
                    <div className="header-actions">
                        <div className="search-box">
                            <input type="text" placeholder="Search food items..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                            <i className="fas fa-search"></i>
                        </div>
                        <button className="header-cart-btn" onClick={() => setIsCartOpen(true)}>
                            <i className="fas fa-shopping-cart"></i> Cart
                            <span className="header-cart-badge pop" key={totalQty}>{totalQty}</span>
                        </button>
                        <div className="category-pills">
                            {categories.map(cat => (
                                <button key={cat.id} className={`pill ${category === cat.id ? 'active' : ''}`} onClick={() => setCategory(cat.id)}>{cat.label}</button>
                            ))}
                        </div>
                    </div>
                </header>

                <main className="main-content">
                    <h2 className="section-title"><i className="fas fa-fire"></i> Popular Now</h2>
                    <div className="food-grid">
                        {filteredFoods.map((item, index) => {
                            const cartItem = cart.find(c => c.id === item.id);
                            return (
                                <div className="food-card" key={item.id} style={{ animationDelay: `${index * 0.05}s` }}>
                                    <img src={item.image} alt={item.name} className="food-image" loading="lazy" onError={(e) => handleImageError(e, item.image)} />
                                    <span className={`food-badge ${item.badge}`}>{item.badge === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}</span>
                                    <div className="food-info">
                                        <h3 className="food-name">{item.name}</h3>
                                        <p className="food-desc">{item.description}</p>
                                        <div className="food-footer">
                                            <div className="food-price">₹{item.price} <span>{item.popular ? '🔥 Popular' : ''}</span></div>
                                            {cartItem ? (
                                                <div className="qty-control">
                                                    <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>−</button>
                                                    <span className="qty-value">{cartItem.qty}</span>
                                                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                                                </div>
                                            ) : (
                                                <button className="add-btn" onClick={() => addToCart(item)}><i className="fas fa-plus"></i></button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>

            {totalQty > 0 && (
                <button className="floating-cart-btn" style={{ display: 'flex' }} onClick={() => setIsCartOpen(true)}>
                    <div className="cart-icon-wrap"><i className="fas fa-shopping-basket"></i></div>
                    <span className="btn-text">View Cart</span>
                    <div className="item-badge pop" key={totalQty}><span>{totalQty}</span> Items</div>
                </button>
            )}

            <div className={`notification ${notification.show ? 'show' : ''}`}>
                <div className="notification-icon"><i className="fas fa-check"></i></div>
                <div className="notification-content"><h4>Notification</h4><p>{notification.text}</p></div>
            </div>
            
            <div className="session-timer"><i className="fas fa-clock"></i> Session: <span>{formatTime(timeLeft)}</span></div>

            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} bill={bill} updateQuantity={updateQuantity} removeFromCart={id => setCart(prev => prev.filter(c => c.id !== id))} onProceedToPay={() => { setIsCartOpen(false); setIsPaymentOpen(true); }} />
            <PaymentModal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} cart={cart} bill={bill} onSuccess={handlePaymentSuccess} />
            <SuccessModal isOpen={isSuccessOpen} completedOrder={completedOrder} onReset={resetApp} />
        </div>
    );
}