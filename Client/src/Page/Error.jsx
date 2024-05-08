import React, { useState } from 'react';
import './Error.css';
import { Link } from 'react-router-dom';

const Error = () => {
    const [promptCode, setPromptCode] = useState('');

    const handleChange = (e) => {
        setPromptCode(e.target.value);
    };

    return (
        <div className="error-container">
            <div className="error-content">
                <h1 className='test'><a target='blank' href="http://wa.me/+14155238886?text=join%20sing-grass">join me*</a> </h1>
                <h1>Oops!</h1>
                <p>Please enter the code:</p>
                <input type="password" value={promptCode} onChange={handleChange} />
                <p>Only admin can access this page.</p>
                {promptCode === "admin" && (
                    <Link to="/login"><button>Login</button></Link>
                )}
            </div>
        </div>
    );
};

export default Error;
