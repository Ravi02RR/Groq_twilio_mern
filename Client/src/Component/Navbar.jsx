// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const isAdmin = localStorage.getItem('isAdmin');

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        window.location.href = '/';
        
    };

    return (
        <nav className="navbar">
            <div className="logo">Twilio</div>
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/search">Search</Link>
                </li>
                {isAdmin && (
                    <li>
                        <button style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'black',
                            cursor: 'pointer'
                            
                        
                        }} onClick={handleLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
