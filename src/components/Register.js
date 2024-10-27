// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api'; // Make sure this matches your API service path

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData); // Use the registerUser function
            setMessage('Registration successful! Please log in.'); // Success message
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            setMessage('Registration failed: ' + (error.response?.data?.message || 'Please try again.'));
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
            {message && <div>{message}</div>} {/* Display message */}
        </div>
    );
};

export default Register;
