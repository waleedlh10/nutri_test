import React, { useState } from "react";
import axios from "axios";
import "./CreateOperation.css"

function CreateOperation({ closeModal }) {
    const [formData, setFormData] = useState({
        category: "",
        amount: "",
        description: "",
        operation_type: "income",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/operations/`,
                formData
            );
            console.log("Operation created:", response.data);

            setFormData({
                category: "",
                amount: "",
                description: "",
                operation_type: "income",
            });

            closeModal();
        } catch (error) {
            console.error("Error creating operation:", error);
        }
    };

    return (
        <form className="operation-form" onSubmit={handleSubmit}>
            <div>
                <label>Category:</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Amount:</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    step="0.01"
                />
            </div>

            <div>
                <label>Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Operation Type:</label>
                <select
                    name="operation_type"
                    value={formData.operation_type}
                    onChange={handleChange}
                    required
                >
                    <option value="income">Income</option>
                    <option value="spent">Spent</option>
                </select>
            </div>

            <button type="submit">Create </button>
        </form>
    );
}

export default CreateOperation;
