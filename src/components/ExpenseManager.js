// src/components/ExpenseManager.js
import React from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

const ExpenseManager = () => {
    return (
        <div>
            <h2>Manage Expenses</h2>
            <ExpenseForm />
            <ExpenseList />
        </div>
    );
};

export default ExpenseManager;
