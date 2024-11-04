import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './TableContainer.module.css';

const TableContainer = ({ openModal }) => {
    const [OperationsData, setOperationsData] = useState({
        count: 0,
        next: null,
        previous: null,
        results: []
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);

    const fetchSpentData = async () => {
        try {
            const startDate = "2024-01-01T00:00:00Z";
            const endDate = "2024-12-31T23:59:59Z";

            const response = await axios.get(process.env.REACT_APP_API_URL + `/operations/`, {
                params: {
                    start_date: startDate,
                    end_date: endDate,
                    page: currentPage
                }
            });

            setOperationsData(response.data);
            const calculatedTotalPages = Math.ceil(response.data.count / response.data.results.length);
            setTotalPages(calculatedTotalPages);
        } catch (err) {
            setError("Error fetching data: " + err.message);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    useEffect(() => {
        fetchSpentData();
    }, [currentPage]); // Re-fetch data whenever currentPage changes

    return (
        <div className="table_container d-flex gap-2">
            <div className="window">
                <div className="d-flex flex-column h-100">
                    <div className="window_title d-flex align-items-baseline justify-content-between w-100">
                        <span>Operations</span>
                        <button className="btn btn-dark" onClick={() => openModal()}>Add Operation</button>
                    </div>
                    <div className="window_body text-center d-flex flex-grow-1">
                        <div className="container pt-3 d-flex flex-column">
                            <div className="flex-grow-1">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Category</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Operation Type</th>
                                            <th colSpan="2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {OperationsData.results.map((operation) => (
                                            <tr key={operation.operation_id}>
                                                <td>{operation.category}</td>
                                                <td>${operation.amount.toFixed(2)}</td>
                                                <td>{operation.description}</td>
                                                <td className={operation.operation_type === "income" ? "text-success" : "text-danger"}>
                                                    {operation.operation_type}
                                                </td>
                                                <td>
                                                    <button type="button" className="btn btn-dark-outline">
                                                        <i className="bi bi-pencil-square"></i>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button type="button" className="btn btn-dark-outline text-danger">
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-between">
                                    <li className="page-item">
                                        <a
                                            className={`page-link text-black border-0 ${currentPage > 1 ? '' : 'disabled'}`}
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePrevious();
                                            }}
                                        >
                                            <i className="bi bi-chevron-left"></i>
                                            <span>Previous</span>
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a
                                            className={`page-link text-black border-0 ${currentPage < totalPages ? '' : 'disabled'}`}
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleNext();
                                            }}
                                        >
                                            <span>Next</span>
                                            <i className="bi bi-chevron-right"></i>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableContainer;
