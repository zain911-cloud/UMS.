// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ExpenseManager from './components/ExpenseManager';
import Logout from './components/Logout'; // Import the Logout component

const AppRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    // Update authentication state when the token changes
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/register">Register</Link>
                {!isAuthenticated ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <>
                        <Logout /> {/* Render the Logout component */}
                        <Link to="/expenses" style={{ marginLeft: '10px' }}>Expenses</Link>
                    </>
                )}
            </nav>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/expenses/*" element={<ExpenseManager />} />
                <Route path="/" element={<h1>Welcome! Please register or login.</h1>} />
            </Routes>
        </>
    );
};

const App = () => (
    <Router>
        <AppRoutes />
    </Router>
);

export default App;
