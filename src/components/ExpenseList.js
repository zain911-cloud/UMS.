// src/components/ExpenseList.js
import React, { useEffect, useState } from 'react';
import { fetchExpenses } from '../services/api'; // Remove deleteExpense import

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadExpenses = async () => {
            try {
                const response = await fetchExpenses();
                setExpenses(response.data);
            } catch (err) {
                setError('Failed to fetch expenses');
                console.error(err);
            }
        };

        loadExpenses();
    }, []);

    return (
        <div>
            <h2>Expense List</h2>
            {error && <div>{error}</div>}
            <ul>
                {expenses.map(expense => (
                    <li key={expense._id}>
                        {expense.description}: ${expense.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;
