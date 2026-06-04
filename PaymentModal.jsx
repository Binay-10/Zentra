import React, { useState, useEffect } from 'react';

export default function PaymentModal({ isOpen, onClose, cart, bill, onSuccess }) {
    const [render, setRender] = useState(isOpen);
    const [step, setStep] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState('upi');
    const [isProcessing, setIsProcessing] = useState(false);
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });

    useEffect(() => {
        if (isOpen) {
            setRender(true);
            setStep(1); // Reset to step 1 on open
            setCardDetails({ number: '', expiry: '', cvv: '', name: '' });
        } else {
            const timer = setTimeout(() => setRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!render) return null;

    const handleCardInput = (e, type) => {
        let val = e.target.value;
        if (type === 'number') val = val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
        if (type === 'expiry') {
            val = val.replace(/\D/g, '');
            if (val.length > 2) val = val.substring(0, 2) + '/' + val.substring(2, 4);
        }
        setCardDetails({ ...cardDetails, [type]: val });
    };

    const processPayment = () => {
        if (selectedPayment === 'card') {
            if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
                alert('Please fill all card details to proceed securely.');
                return;
            }
        }
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            onSuccess(selectedPayment, bill);
        }, 2000);
    };

    const totalItems = cart.reduce((s, i) => s + i.qty, 0);

    return (
        <div className={`modal-overlay ${isOpen ? 'active' : ''}`} style={{ display: render ? 'flex' : 'none' }}>
            <div className="modal">
                <div className="modal-header">
                    <div className="modal-icon"><i className="fas fa-receipt"></i></div>
                    <h2 className="modal-title">Order Summary</h2>
                    <p className="modal-subtitle">Complete your payment securely</p>
                </div>

                {step === 1 && (
                    <div className="payment-step">
                        <div className="bill-details">
                            <div className="bill-item"><span>Items ({totalItems})</span><span>₹{bill.subtotal.toFixed(2)}</span></div>
                            <div className="bill-item"><span>CGST (2.5%)</span><span>₹{bill.cgst.toFixed(2)}</span></div>
                            <div className="bill-item"><span>SGST (2.5%)</span><span>₹{bill.sgst.toFixed(2)}</span></div>
                            {bill.discount > 0 && <div className="bill-item" style={{ color: 'var(--success)' }}><span>Student Discount</span><span>-₹{bill.discount.toFixed(2)}</span></div>}
                            <div className="bill-item" style={{ fontWeight: 800, fontSize: '16px', marginTop: '10px', borderTop: '1px solid var(--glass-border)', paddingTop: '10px' }}>
                                <span>Total Payable</span><span style={{ color: 'var(--accent)' }}>₹{bill.total.toFixed(2)}</span>
                            </div>
                        </div>
                        <div style={{ margin: '20px 0' }}>
                            <p style={{ fontSize: '13px', color: '#475569', marginBottom: '12px', fontWeight: 600 }}>SELECT PAYMENT METHOD</p>
                            <div className="payment-methods">
                                <div className="payment-method" onClick={() => { setSelectedPayment('upi'); setStep(2); }}><i className="fas fa-qrcode" style={{ color: 'var(--primary)' }}></i><span>UPI / QR</span></div>
                                <div className="payment-method" onClick={() => { setSelectedPayment('card'); setStep(2); }}><i className="fas fa-credit-card" style={{ color: 'var(--secondary)' }}></i><span>Card</span></div>
                                <div className="payment-method" onClick={() => { setSelectedPayment('cash'); setStep(2); }}><i className="fas fa-money-bill-wave" style={{ color: 'var(--success)' }}></i><span>Cash Counter</span></div>
                            </div>
                        </div>
                        <button className="close-btn" onClick={onClose}>Cancel</button>
                    </div>
                )}

                {step === 2 && (
                    <div className="payment-step">
                        {selectedPayment === 'upi' && (
                            <div className="payment-view">
                                <div className="qr-container">
                                    <div className="qr-pulse"></div>
                                    <p style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary)' }}>Scan to Pay ₹<span>{bill.total.toFixed(2)}</span></p>
                                    <div className="qr-wrapper"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=binaychandra.scg@okhdfcbank&pn=SNPSU&am=${bill.total.toFixed(2)}&cu=INR`)}&margin=10`} alt="UPI QR" /></div>
                                </div>
                            </div>
                        )}
                        {selectedPayment === 'card' && (
                            <div className="payment-view">
                                <div className="card-mockup"><div className="card-chip"></div><div className="card-logo"><i className="fab fa-cc-visa"></i> <i className="fab fa-cc-mastercard" style={{ marginLeft: '5px' }}></i></div></div>
                                <div className="form-group"><label>Card Number</label><input type="text" placeholder="0000 0000 0000 0000" maxLength="19" value={cardDetails.number} onChange={(e) => handleCardInput(e, 'number')} /></div>
                                <div className="form-row">
                                    <div className="form-group"><label>Expiry Date</label><input type="text" placeholder="MM/YY" maxLength="5" value={cardDetails.expiry} onChange={(e) => handleCardInput(e, 'expiry')} /></div>
                                    <div className="form-group"><label>CVV</label><input type="password" placeholder="•••" maxLength="3" value={cardDetails.cvv} onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})} /></div>
                                </div>
                                <div className="form-group" style={{ marginBottom: '25px' }}><label>Cardholder Name</label><input type="text" placeholder="Name on card" value={cardDetails.name} onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})} /></div>
                            </div>
                        )}
                        {selectedPayment === 'cash' && (
                            <div className="payment-view">
                                <div className="cash-icon-wrapper"><i className="fas fa-cash-register"></i></div>
                                <h3 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Pay at Counter</h3>
                                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.5, marginBottom: '25px' }}>Please proceed to the cash counter with your generated receipt to complete your payment of <strong>₹<span>{bill.total.toFixed(2)}</span></strong>.</p>
                            </div>
                        )}
                        <button className="pay-btn" onClick={processPayment} disabled={isProcessing}>
                            {isProcessing ? <><span className="loader"></span> Verifying...</> : 
                                selectedPayment === 'upi' ? <><i className="fas fa-check-circle"></i> I have made the payment</> :
                                selectedPayment === 'card' ? <><i className="fas fa-lock"></i> Pay ₹{bill.total.toFixed(2)} Securely</> :
                                <><i className="fas fa-receipt"></i> Print Cash Order Receipt</>}
                        </button>
                        <button className="close-btn" onClick={() => setStep(1)}><i className="fas fa-arrow-left"></i> Back to Methods</button>
                    </div>
                )}
            </div>
        </div>
    );
}