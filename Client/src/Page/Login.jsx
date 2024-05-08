import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [attempts, setAttempts] = useState(0);

    const handleGetOTP = async () => {
        try {
            const response = await axios.get("https://api-ravi02rrs-projects.vercel.app/getotp");
            console.log('OTP sent successfully:', response.data);
            setOtpSent(true);
            setResendDisabled(true);
            setAttempts(prevAttempts => prevAttempts + 1);
            setCountdown(60 * Math.pow(2, attempts)); 
            startCountdown();
            toast.success("OTP sent successfully");
        } catch (error) {
            console.error('Error sending OTP:', error);
            toast.error("Error sending OTP");
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const response = await axios.post("https://api-ravi02rrs-projects.vercel.app/verify", { otp });
            if (response.data.success) {
                console.log('OTP verification successful');
                setIsAdmin(true);
                localStorage.setItem('isAdmin', true);
                window.location.href = '/';
                toast.success("OTP verification successful");
            } else {
                console.error('Invalid OTP');
                toast.error("Invalid OTP");
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            toast.error("Error verifying OTP");
        }
    };

    const startCountdown = () => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown === 1) {
                    clearInterval(interval);
                    setResendDisabled(false);
                    
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        const storedIsAdmin = localStorage.getItem('isAdmin');
        if (storedIsAdmin === 'true') {
            setIsAdmin(true);
        }
    }, []);

    return (
        <div className="login-container">
            <ToastContainer position="top-right" autoClose={5000} />
            <h2>Login</h2>
            {!isAdmin && (
                <div>
                    <button className="otp-button" onClick={handleGetOTP} disabled={otpSent || resendDisabled}>Get OTP</button>
                    {otpSent && (
                        <div className="otp-input-container">
                            <input className="otp-input" type="text" required value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
                            <button className="verify-button" onClick={handleVerifyOTP}>Verify OTP</button>
                        </div>
                    )}
                    {resendDisabled && (
                        <p>Resend OTP in {countdown} seconds</p>
                    )}
                </div>
            )}
            {isAdmin && <div className="logged-in-message">You are logged in!</div>}
        </div>
    );
};

export default Login;
