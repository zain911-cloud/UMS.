// src/components/ExpenseForm.js
import React, { useEffect, useState } from 'react';
import { createExpense, updateExpense, fetchExpenseById } from '../services/api'; // Ensure to import both functions
import { useNavigate, useParams } from 'react-router-dom';

const ExpenseForm = () => {
    const { id } = useParams(); // Get the id from URL params if updating
    const navigate = useNavigate();
    const [expenseData, setExpenseData] = useState({ description: '', amount: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loadExpense = async () => {
            if (id) {
                try {
                    const response = await fetchExpenseById(id); // Fetch expense data by ID
                    setExpenseData(response.data); // Set the state with fetched data
                } catch (error) {
                    console.error('Error fetching expense:', error);
                }
            }
        };
        loadExpense();
    }, [id]);

    const handleChange = (e) => {
        setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateExpense(id, expenseData); // Use the updateExpense function
                setMessage('Expense updated successfully!');
            } else {
                await createExpense(expenseData); // Use the createExpense function
                setMessage('Expense added successfully!');
            }
            setTimeout(() => {
                navigate('/expenses'); // Redirect to expenses list
            }, 2000);
        } catch (error) {
            setMessage('Error: ' + (error.response?.data?.message || 'Please try again.'));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="description"
                value={expenseData.description}
                onChange={handleChange}
                placeholder="Description"
                required
            />
            <input
                name="amount"
                type="number"
                value={expenseData.amount}
                onChange={handleChange}
                placeholder="Amount"
                required
            />
            <button type="submit">{id ? 'Update Expense' : 'Add Expense'}</button>
            {message && <div>{message}</div>} {/* Display message */}
        </form>
    );
};

export default ExpenseForm;
