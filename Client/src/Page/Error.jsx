import React from 'react';
import './Error.css';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="error-container">
            <div className="error-content">
                <h1>Oops!</h1>
                <p>Only admin can access this page.</p>
                <p>Please login as admin to access.</p>
                <Link to="/login"><button>Login</button></Link>
            </div>
        </div>
    );
};

export default Error;
