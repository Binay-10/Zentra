import React, { useState, useEffect } from 'react';

export default function SuccessModal({ isOpen, completedOrder, onReset }) {
    const [render, setRender] = useState(isOpen);
    const [dateString, setDateString] = useState('');

    useEffect(() => {
        if (isOpen) {
            setRender(true);
            setDateString(new Date().toLocaleString());
        } else {
            const timer = setTimeout(() => setRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!render || !completedOrder) return null;
    
    const { id, method, bill, cart } = completedOrder;

    return (
        <div className={`modal-overlay ${isOpen ? 'active' : ''}`} style={{ display: render ? 'flex' : 'none' }}>
            <div className="modal" style={{ maxWidth: '400px' }}>
                <div className="modal-header">
                    <div className="modal-icon"><i className="fas fa-check"></i></div>
                    <h2 className="modal-title">Payment Successful!</h2>
                    <p className="modal-subtitle">Order #CB<span>{id}</span></p>
                </div>
                
                <div className="receipt-paper">
                    <div className="receipt-header">
                        <div className="receipt-title">🎓 SNPSU</div>
                        <div className="receipt-meta">College Canteen • GSTIN: 29AABCU9603R1ZX</div>
                        <div className="receipt-meta">Order #CB{id}</div>
                        <div className="receipt-meta">{dateString}</div>
                    </div>
                    {cart.map(item => (
                        <div className="receipt-item" key={item.id}><span>{item.name} × {item.qty}</span><span>₹{(item.price * item.qty).toFixed(2)}</span></div>
                    ))}
                    <div className="receipt-item" style={{ borderTop: '1px dashed #ccc', marginTop: '8px', paddingTop: '8px' }}><span>Subtotal</span><span>₹{bill.subtotal.toFixed(2)}</span></div>
                    <div className="receipt-item"><span>CGST 2.5%</span><span>₹{bill.cgst.toFixed(2)}</span></div>
                    <div className="receipt-item"><span>SGST 2.5%</span><span>₹{bill.sgst.toFixed(2)}</span></div>
                    {bill.discount > 0 && <div className="receipt-item" style={{ color: '#059669' }}><span>Student Discount</span><span>-₹{bill.discount.toFixed(2)}</span></div>}
                    <div className="receipt-total receipt-item"><span>TOTAL</span><span>₹{bill.total.toFixed(2)}</span></div>
                    <div className="barcode"></div>
                    <div className="receipt-footer">
                        <p><strong>Payment:</strong> {method.toUpperCase()}</p>
                        <p>Thank you for your order!</p>
                        <p style={{ marginTop: '8px', fontSize: '10px' }}>This is a computer generated receipt</p>
                    </div>
                </div>
                <button className="close-btn" onClick={onReset} style={{ marginTop: '20px' }}><i className="fas fa-plus"></i> New Order</button>
            </div>
        </div>
    );
}