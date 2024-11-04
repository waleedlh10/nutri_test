import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './WindowContainer.module.css';

const WindowContainer = () => {
    const [spentData, setSpentData] = useState({
        "spent_count": 0,
        "total_spent_amount": 0,
        "income_count": 0,
        "total_income_amount": 0
    });
    const [error, setError] = useState(null);



    useEffect(() => {
        const fetchSpentData = async () => {
            try {
                const startDate = "2024-01-01T00:00:00Z";
                const endDate = "2024-12-31T23:59:59Z";

                const response = await axios.get(process.env.REACT_APP_API_URL + "/total_operations/", {
                    params: {
                        start_date: startDate,
                        end_date: endDate
                    }
                });

                setSpentData(response.data);


            } catch (err) {
                setError("Error fetching data: " + err.message);
            }
        };

        fetchSpentData();
    }, []);

    return (
        <div className="window_container d-flex gap-2">
            <div className="window">
                <div>
                    <div>
                        <div className="icon">
                            <i className="bi bi-bank"></i>
                        </div>
                        <div className="window_title">
                            Money Income
                        </div>
                    </div>
                    <hr />
                    <div className="window_body">
                        <span className="w-100 text-center fs-3">${spentData.total_income_amount}</span>
                    </div>
                </div>
            </div>
            <div className="window">
                <div>
                    <div>
                        <div className="icon">
                            <i className="bi bi-cart3"></i>
                        </div>
                        <div className="window_title">
                            Money Spent
                        </div>
                    </div>
                    <hr />
                    <div className="window_body">
                        <span className="w-100 text-center fs-3">${spentData.total_spent_amount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WindowContainer;
