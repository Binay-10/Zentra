import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Kiosk from './Kiosk';
import Admin from './Admin';

export default function App() {
    return (
        <BrowserRouter>
            {/* Global background animations preserved */}
            <div className="bg-animation"></div>
            <div className="floating-shapes">
                <div className="shape"></div>
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            
            <Routes>
                <Route path="/" element={<Kiosk />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </BrowserRouter>
    );
}