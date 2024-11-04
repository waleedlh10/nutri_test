import React from 'react';
import styles from './TimeFilter.module.css';

const TimeFilter = () => {
    return (

        <div className="p-3">
            <div className="interval d-flex align-items-center gap-2">
                {/* <div className="btn-group">
                    <button className="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Months
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
                <div className="break"></div> */}
                <div className="interval_propositions w-100">
                    <div className="d-flex gap-4 h-100 align-items-center justify-content-center ">
                        <div className="interval_proposition py-1 px-2 active">
                            January
                        </div>
                        <div className="interval_proposition py-1 px-2">
                            February
                        </div>
                        <div className="interval_proposition py-1 px-2">
                            March
                        </div>
                        <div className="interval_proposition py-1 px-2">
                            April
                        </div>
                        <div className="interval_proposition py-1 px-2">
                            May
                        </div>
                        <div className="interval_proposition py-1 px-2">
                            June
                        </div>
                        <div className="interval_proposition py-1 px-2">
                            July
                        </div>
                        <div className="interval_proposition py-1 px-2">
                            August
                        </div>
                        <div className="interval_proposition py-1 px-2">
                            September
                        </div>
                        <div className="interval_proposition py-1 px-2">
                            October
                        </div>
                        <div className="interval_proposition py-1 px-2">
                            November
                        </div>
                        <div className="interval_proposition py-1 px-2">
                            December
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default TimeFilter;
