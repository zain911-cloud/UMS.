// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Adjust to your backend URL
});

// Optional: Interceptors for adding tokens to requests if needed
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Create an expense
export const createExpense = async (expenseData) => {
    return await api.post('/expenses', expenseData);
};

// Fetch all expenses
export const fetchExpenses = async () => {
    return await api.get('/expenses');
};

// Fetch an expense by ID
export const fetchExpenseById = async (id) => {
    return await api.get(`/expenses/${id}`); // Make sure your backend has this endpoint
};

// Update an expense
export const updateExpense = async (id, expenseData) => {
    return await api.put(`/expenses/${id}`, expenseData); // Update endpoint
};

// Delete an expense
export const deleteExpense = async (id) => {
    return await api.delete(`/expenses/${id}`); // Delete endpoint
};

// Register a user
export const registerUser = async (userData) => {
    return await api.post('/users/register', userData);
};

// Log in a user
export const loginUser = async (userData) => {
    return await api.post('/users/login', userData);
};

// Default export of the axios instance
export default api;
