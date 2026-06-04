import React, { useState, useEffect } from 'react';
import { handleImageError } from './utils';

export default function CartModal({ isOpen, onClose, cart, bill, updateQuantity, removeFromCart, onProceedToPay }) {
    const [render, setRender] = useState(isOpen);

    // This logic ensures CSS exit animations are played just like the vanilla setTimeout
    useEffect(() => {
        if (isOpen) setRender(true);
        else {
            const timer = setTimeout(() => setRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!render) return null;
    
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

    return (
        <div className={`modal-overlay ${isOpen ? 'active' : ''}`} style={{ display: render ? 'flex' : 'none' }}>
            <div className="modal cart-modal">
                <div className="cart-header">
                    <div className="cart-title">
                        <i className="fas fa-shopping-basket"></i>
                        Your Order
                        <span className="cart-count pop" key={totalQty}>{totalQty}</span>
                    </div>
                    <button className="close-btn-icon" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <i className="fas fa-shopping-cart"></i>
                            <p>Your cart is empty</p>
                            <p style={{ fontSize: '12px', marginTop: '5px' }}>Add items to get started</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div className="cart-item" key={item.id}>
                                <img src={item.image} alt={item.name} className="cart-item-img" onError={(e) => handleImageError(e, item.image, true)} />
                                <div className="cart-item-details">
                                    <div className="cart-item-name">{item.name}</div>
                                    <div className="cart-item-price">₹{item.price} × {item.qty}</div>
                                </div>
                                <div className="cart-item-actions">
                                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                    <div className="qty-control" style={{ transform: 'scale(0.85)' }}>
                                        <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>−</button>
                                        <span className="qty-value">{item.qty}</span>
                                        <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="bill-section">
                    <div className="bill-row"><span>Subtotal</span><span>₹{bill.subtotal.toFixed(2)}</span></div>
                    <div className="bill-row"><span>CGST (2.5%)</span><span>₹{bill.cgst.toFixed(2)}</span></div>
                    <div className="bill-row"><span>SGST (2.5%)</span><span>₹{bill.sgst.toFixed(2)}</span></div>
                    <div className="bill-row discount" style={{ display: bill.discount > 0 ? 'flex' : 'none' }}>
                        <span>Student Discount (10%)</span><span>-₹{bill.discount.toFixed(2)}</span>
                    </div>
                    <div className="bill-row total"><span>Total Amount</span><span>₹{bill.total.toFixed(2)}</span></div>
                    <div className="gst-breakdown">Inclusive of all taxes • GSTIN: 29AABCU9603R1ZX</div>
                </div>

                <div className="payment-section">
                    <button className="pay-btn" onClick={onProceedToPay} disabled={cart.length === 0}>
                        <i className="fas fa-lock"></i> Proceed to Pay
                    </button>
                    <div className="security-badge"><i className="fas fa-shield-alt"></i><span>256-bit SSL Encrypted & PCI DSS Compliant</span></div>
                </div>
            </div>
        </div>
    );
}