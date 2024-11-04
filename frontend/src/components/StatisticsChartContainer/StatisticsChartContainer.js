import React from 'react';
import styles from './StatisticsChartContainer.module.css';

const StatisticsChartContainer = () => {
    return (
        <div className="statistics_chart_container d-flex gap-2">
            <div className="window">
                <div>
                    <div className="window_title">
                        Statistics
                    </div>
                    <div className="window_body text-center">
                        <span className="w-100 text-center fs-3 ">Line Chart</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsChartContainer;
