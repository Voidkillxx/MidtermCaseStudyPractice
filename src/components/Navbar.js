import React from 'react';

// NOTE: This is a placeholder. Navigation logic (e.g., using props like onNavigate) 
// and styling (Navbar.css) will be added by MEMBER 2 later.
const Navbar = () => {
    
    // Simple inline styles for a clean, placeholder look
    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 3rem',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        fontFamily: 'sans-serif'
    };
    
    const linkStyle = {
        color: '#4CAF50',
        textDecoration: 'none',
        fontWeight: '600',
        padding: '0 15px',
        cursor: 'pointer'
    };

    return (
        <nav style={navStyle}>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#4CAF50' }}>
                Grocery Store
            </div>
            <div>
                <a href="#" style={linkStyle}>Home</a>
                <a href="#" style={linkStyle}>Products</a>
                <a href="#" style={linkStyle}>Cart (0)</a> {/* Cart Count will be dynamic later */}
            </div>
        </nav>
    );
};

export default Navbar;
