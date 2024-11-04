import DonutChart from "../DonutChart/DonutChart"
import React, { useState, useEffect } from "react";
import axios from "axios";



const DonatChartContainer = () => {

    const [incomeData, setIncomeData] = useState(null);
    const [spentData, setSpentData] = useState(null);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchIncomeData = async (startDate, endDate) => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + "/amount_income_by_category/", {
                params: {
                    start_date: startDate,
                    end_date: endDate,
                },
            });
            setIncomeData(response.data);

        } catch (err) {
            setError("Error fetching data: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchSpentData = async (startDate, endDate) => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + "/amount_spent_by_category/", {
                params: {
                    start_date: startDate,
                    end_date: endDate,
                },
            });
            setSpentData(response.data);
            console.log("Response data:", response.data);
        } catch (err) {
            setError("Error fetching data: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const startDate = "2024-01-01T00:00:00Z";
        const endDate = "2024-12-31T23:59:59Z";
        setTimeout(() => { fetchIncomeData(startDate, endDate) }, 4000);
        setTimeout(() => { fetchSpentData(startDate, endDate) }, 4000);

    }, []);

    return (
        <div className="donat_chart_container d-flex gap-2">
            <div className="window">
                <div>
                    <div className="window_title">
                        Revenue
                    </div>
                    <div className="window_body text-center d-flex flex-column">
                        <DonutChart given_data={spentData} data_type={"spentData"} />
                    </div>
                </div>
            </div>
            <div className="window">
                <div>
                    <div className="window_title">
                        Spent
                    </div>
                    <div className="window_body text-center d-flex flex-column">
                        <DonutChart given_data={incomeData} data_type={"incomeData"} />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DonatChartContainer;
