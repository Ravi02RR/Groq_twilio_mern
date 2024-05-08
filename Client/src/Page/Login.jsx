// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [isAdmin, setisAdmin] = useState(false);


    const handleGetOTP = async () => {
        try {
            const response = await axios.get("https://api-ravi02rrs-projects.vercel.app/getotp");
            console.log('OTP sent successfully:', response.data);
            setOtpSent(true);
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };


    const handleVerifyOTP = async () => {
        try {
            const response = await axios.post("https://api-ravi02rrs-projects.vercel.app/verify", { otp });
            if (response.data.success) {
                console.log('OTP verification successful');
                setisAdmin(true);

                localStorage.setItem('isAdmin', true);
                window.location.href = '/';
            } else {
                console.error('Invalid OTP');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };


    useEffect(() => {
        const storedIsAdmin = localStorage.getItem('isAdmin');
        if (storedIsAdmin === 'true') {
            setisAdmin(true);
        }
    }, []);

    return (
        <div className="login-container">
            <h2>Login</h2>
            {!isAdmin && (
                <div>
                    <button className="otp-button" onClick={handleGetOTP} disabled={otpSent}>Get OTP</button>
                    {otpSent && (
                        <div className="otp-input-container">
                            <input className="otp-input" type="text" required value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
                            <button className="verify-button" onClick={handleVerifyOTP}>Verify OTP</button>
                        </div>
                    )}
                </div>
            )}
            {isAdmin && <div className="logged-in-message">You are logged in!</div>}
        </div>
    );
};

export default Login;
