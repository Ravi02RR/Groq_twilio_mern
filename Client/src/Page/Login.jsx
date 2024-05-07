// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post('https://api-ravi02rr-ravi02rrs-projects.vercel.app/login', formData);


            if (response.status === 200) {

                console.log('Login successful');
            }
        } catch (error) {

            console.error('Login failed:', error);
        }
    };

    return (
        <div className='main'>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
