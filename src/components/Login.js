// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Adjust the path if necessary

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/login', formData);
            localStorage.setItem('token', response.data.token); // Save the token
            setMessage('Login successful!'); // Success message
            setTimeout(() => {
                navigate('/expenses'); // Redirect to expenses page after 2 seconds
            }, 2000);
        } catch (error) {
            setMessage('Login failed: ' + (error.response?.data?.message || 'Please try again.'));
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            {message && <div>{message}</div>} {/* Display message */}
        </div>
    );
};

export default Login;
