import React, { useState, useEffect } from 'react';

const EditOperation = ({ existingOperation, onSubmit }) => {
    const [category, setCategory] = useState(existingOperation.category || '');
    const [amount, setAmount] = useState(existingOperation.amount || '');
    const [description, setDescription] = useState(existingOperation.description || '');
    const [operationType, setOperationType] = useState(existingOperation.operation_type || 'income');

    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleAmountChange = (e) => setAmount(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleOperationTypeChange = (e) => setOperationType(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            operation_id: existingOperation.operation_id,
            category,
            amount,
            description,
            operation_type: operationType,
        });
    };

    return (
        <form className="operation-form" onSubmit={handleSubmit}>
            <div>
                <label>Category</label>
                <input
                    type="text"
                    value={category}
                    onChange={handleCategoryChange}
                    placeholder="Enter category"
                />
            </div>
            <div>
                <label>Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Enter amount"
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Enter description"
                ></textarea>
            </div>
            <div>
                <label>Operation Type</label>
                <select value={operationType} onChange={handleOperationTypeChange}>
                    <option value="income">Income</option>
                    <option value="spent">Spent</option>
                </select>
            </div>
            <button type="submit">Update Operation</button>
        </form>
    );
};

export default EditOperation;
