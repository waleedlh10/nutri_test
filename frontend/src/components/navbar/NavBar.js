import React, { useEffect, useState } from "react";
import styles from './NavBar.module.css';
import axios from "axios";

const NavBar = () => {
    const [balanceData, setBalanceData] = useState({
        total_income: 0,
        total_spent: 0,
        current_balance: 0,
    });


    useEffect(() => {
        async function fetchBalanceData() {
            try {
                const response = await axios.get(process.env.REACT_APP_API_URL + "/currentbalance/");
                setBalanceData(response.data);
            } catch (error) {
                console.error("Error fetching balance data:", error);
            }
        }
        fetchBalanceData();
    }, []);

    return (

        <nav className="navbar navbar-expand-lg bg_primary">
            <div className="container-fluid d-flex justify-content-between px-3 w-100">
                <a className="navbar-brand  text-white px-2" href="#">
                    <svg viewBox="0 0 349.99999999999994 136.33696090530455" className="looka-1j8o68f" width="65px">
                        <defs id="SvgjsDefs1449"></defs>
                        <g id="SvgjsG1450" featurekey="rZF8Vg-0"
                            transform="matrix(1.5652905874667773,0,0,1.5652905874667773,97.04320846406509,-42.25596714320103)"
                            fill="#FFFFFF">
                            <g xmlns="http://www.w3.org/2000/svg" transform="translate(0,-952.36218)">
                                <path
                                    style={{
                                        fontSize: 'medium',
                                        fontStyle: 'normal',
                                        fontVariant: 'normal',
                                        fontWeight: 'normal',
                                        fontStretch: 'normal',
                                        textIndent: '0',
                                        textAlign: 'start',
                                        textDecoration: 'none',
                                        lineHeight: 'normal',
                                        letterSpacing: 'normal',
                                        wordSpacing: 'normal',
                                        textTransform: 'none',
                                        direction: 'ltr',
                                        blockProgression: 'tb',
                                        writingMode: 'lr-tb',
                                        textAnchor: 'start',
                                        baselineShift: 'baseline',
                                        opacity: '1',
                                        fill: '#FFFFFF',
                                        fillOpacity: '1',
                                        stroke: 'none',
                                        strokeWidth: '2',
                                        marker: 'none',
                                        visibility: 'visible',
                                        display: 'inline',
                                        overflow: 'visible',
                                        enableBackground: 'accumulate',
                                        fontFamily: 'Sans',
                                        InkscapeFontSpecification: 'Sans'
                                    }}
                                    d="M 7.8125 27 A 1.0001 1.0001 0 0 0 7 28 L 7 72 A 1.0001 1.0001 0 0 0 8 73 L 86 73 A 1.0001 1.0001 0 1 0 86 71 L 66.75 71 C 72.970547 66.074647 77 58.547497 77 49.96875 C 77 41.425551 73.019166 33.929418 66.84375 29 L 91 29 L 91 72 A 1.0001 1.0001 0 1 0 93 72 L 93 28 A 1.0001 1.0001 0 0 0 92 27 L 8 27 A 1.0001 1.0001 0 0 0 7.8125 27 z M 9 29 L 33.1875 29 C 27.003835 33.927526 23 41.420451 23 49.96875 C 23 58.544998 27.031694 66.073711 33.25 71 L 9 71 L 9 29 z M 36.59375 29 L 63.4375 29 C 70.399113 33.455188 75 41.077982 75 49.96875 C 75 58.88395 70.369734 66.51905 63.375 70.96875 A 1.0001 1.0001 0 0 0 63.3125 71 L 36.6875 71 A 1.0001 1.0001 0 0 0 36.625 70.96875 C 29.634084 66.51815 25 58.88035 25 49.96875 C 25 41.074717 29.625502 33.454582 36.59375 29 z M 49.875 33.96875 A 1.0001 1.0001 0 0 0 49 35 L 49 37.09375 C 47.305389 37.302887 45.736005 38.003171 44.5 39.0625 C 43.025866 40.32592 42.000002 42.09293 42 44 C 41.999996 47.420797 44.921219 50.496217 49 50.9375 L 49 60.90625 C 47.777331 60.740805 46.645595 60.3035 45.78125 59.625 C 44.686074 58.7653 44 57.6143 44 56 A 1.0001 1.0001 0 1 0 42 56 C 42 58.2098 43.022513 60.03435 44.53125 61.21875 C 45.785843 62.203557 47.359675 62.801755 49 62.96875 L 49 65 A 1.0001 1.0001 0 1 0 51 65 L 51 62.9375 C 52.694615 62.72127 54.263998 61.965646 55.5 60.90625 C 56.974131 59.64285 58 57.907 58 56 C 58 52.579203 55.078787 49.535033 51 49.09375 L 51 39.09375 C 52.222672 39.250999 53.354408 39.665281 54.21875 40.34375 C 55.313922 41.20341 56 42.38563 56 44 A 1.0001 1.0001 0 1 0 58 44 C 58 41.79018 56.977491 39.96554 55.46875 38.78125 C 54.214153 37.796451 52.640322 37.229509 51 37.0625 L 51 35 A 1.0001 1.0001 0 0 0 49.875 33.96875 z M 49 39.09375 L 49 48.9375 C 45.928471 48.519796 43.999998 46.216428 44 44 C 44.000001 42.83389 44.682721 41.56204 45.8125 40.59375 C 46.691641 39.840272 47.827393 39.298873 49 39.09375 z M 51 51.09375 C 54.070382 51.512163 56 53.784042 56 56 C 56 57.1661 55.317282 58.4067 54.1875 59.375 C 53.309163 60.127794 52.171443 60.692285 51 60.90625 L 51 51.09375 z "
                                    transform="translate(0,952.36218)"></path>
                            </g>
                        </g>
                        <g id="SvgjsG1451" featurekey="6VBqdG-0"
                            transform="matrix(2.4714024295113304,0,0,2.4714024295113304,-2.7185436152276723,77.51758496846531)"
                            fill="#FFFFFF">
                            <path d="M14.04 9.44 c2 0 3.98 1.28 3.98 4.66 l0 5.9 l-2.16 0 l0 -5.9 c0 -1.78 -0.9 -2.76 -2.42 -2.76 c-1.58 0 -2.54 1.32 -2.8 2.62 l0 6.04 l-2.16 0 l0 -5.9 c0 -1.78 -1.1 -2.76 -2.44 -2.76 c-1.66 0 -2.56 1.32 -2.78 2.62 l0 6.04 l-2.16 0 l0 -10.4 l2.16 0 l0 2.26 c0.08 -0.66 1.1 -2.42 3.28 -2.42 c1.42 0 2.98 0.78 3.7 2.5 c0.32 -0.9 1.56 -2.5 3.8 -2.5 z M25 9.42 c2.36 0 5.38 1.8 5.38 5.4 c0 3.62 -3.02 5.38 -5.38 5.38 s-5.38 -1.76 -5.38 -5.38 c0 -3.6 3.02 -5.4 5.38 -5.4 z M25 11.34 c-1.52 0 -3.28 1.16 -3.28 3.48 c0 2.3 1.76 3.46 3.28 3.46 s3.28 -1.16 3.28 -3.46 c0 -2.32 -1.76 -3.48 -3.28 -3.48 z M37.900000000000006 9.44 c2 0 3.96 1.3 3.96 4.54 l0 6.02 l-2.16 0 l0 -5.9 c0 -1.98 -0.94 -2.76 -2.28 -2.76 c-1.72 0 -2.84 1.6 -3.08 2.62 l0 6.04 l-2.16 0 l0 -10.4 l2.16 0 l0 2.2 c0.2 -0.64 1.4 -2.36 3.56 -2.36 z M48.84 9.42 c2.36 0 5.56 1.8 5.06 6.16 l-8.28 0 c0.32 1.86 1.8 2.78 3.48 2.78 c1.38 0 2.12 -0.36 2.88 -0.96 l1.22 1.16 c-0.92 1.04 -2.24 1.64 -4.16 1.64 c-2.64 0 -5.58 -1.8 -5.58 -5.38 c0 -3.6 3.02 -5.4 5.38 -5.4 z M48.84 11.28 c-1.34 0 -2.84 0.9 -3.2 2.72 l6.36 0 c-0.24 -1.82 -1.82 -2.72 -3.16 -2.72 z M64.12 9.58 l2.16 0 l-6.34 14.22 l-2.16 0 l1.88 -4.14 l-4.5 -10.08 l2.16 0 l3.4 7.72 z M79.18 11.4 l-2.2 0 l0 5.82 c0 0.56 0.2 1 0.84 1 c0.54 0 0.92 -0.1 1.36 -0.28 l0 1.82 c-0.44 0.22 -1.02 0.36 -1.92 0.36 c-1.3 0 -2.44 -0.52 -2.44 -2.82 l0 -5.9 l-1.44 0 l0 -1.8 l1.44 0 l0 -2.44 l2.16 0 l0 2.44 l2.2 0 l0 1.8 z M86.88 9.44 c0.22 0 0.42 0 0.62 0.04 l0 2.06 c-0.2 -0.04 -0.4 -0.04 -0.56 -0.04 c-1.96 0 -3.56 1.4 -3.8 3.6 l0 4.9 l-2.16 0 l0 -10.4 l2.16 0 l0 2.66 c0.44 -1.54 1.78 -2.82 3.74 -2.82 z M93.97999999999999 9.42 c1.88 0 3.12 1.12 3.38 1.8 l0 -1.62 l2.16 0 l0 10.4 l-2.16 0 l0 -1.72 c-0.26 0.84 -1.5 1.92 -3.38 1.92 c-2.36 0 -5.18 -1.76 -5.18 -5.4 c0 -3.58 2.82 -5.38 5.18 -5.38 z M94.25999999999999 11.34 c-1.62 0 -3.36 1.16 -3.36 3.46 c0 2.32 1.74 3.48 3.36 3.48 s3.2 -1.14 3.2 -3.48 c0 -2.32 -1.58 -3.46 -3.2 -3.46 z M106.69999999999999 9.42 c1.88 0 3.5 0.84 4.44 2.52 l-1.68 0.76 c-0.62 -0.84 -1.46 -1.36 -2.74 -1.36 c-1.54 0 -3.3 1.16 -3.3 3.48 c0 2.3 1.76 3.44 3.3 3.44 c1.28 0 2.12 -0.5 2.74 -1.34 l1.7 0.76 c-0.96 1.68 -2.56 2.5 -4.46 2.5 c-2.36 0 -5.38 -1.74 -5.38 -5.36 c0 -3.6 3.02 -5.4 5.38 -5.4 z M120.27999999999999 20 l-4.08 -4.44 l-1.18 1.22 l0 3.22 l-2.16 0 l0 -3.54 l0 -10.6 l2.16 0 l0 8.28 l4.24 -4.54 l2.6 0 l-4.32 4.54 l5.26 5.86 l-2.52 0 z M129.28 9.42 c2.36 0 5.56 1.8 5.06 6.16 l-8.28 0 c0.32 1.86 1.8 2.78 3.48 2.78 c1.38 0 2.12 -0.36 2.88 -0.96 l1.22 1.16 c-0.92 1.04 -2.24 1.64 -4.16 1.64 c-2.64 0 -5.58 -1.8 -5.58 -5.38 c0 -3.6 3.02 -5.4 5.38 -5.4 z M129.28 11.28 c-1.34 0 -2.84 0.9 -3.2 2.72 l6.36 0 c-0.24 -1.82 -1.82 -2.72 -3.16 -2.72 z M142.1 9.44 c0.22 0 0.42 0 0.62 0.04 l0 2.06 c-0.2 -0.04 -0.4 -0.04 -0.56 -0.04 c-1.96 0 -3.56 1.4 -3.8 3.6 l0 4.9 l-2.16 0 l0 -10.4 l2.16 0 l0 2.66 c0.44 -1.54 1.78 -2.82 3.74 -2.82 z">
                            </path>
                        </g>
                    </svg>
                </a>
                <div className="text-white">
                    <div className="d-flex gap-2 align-items-center">
                        {/* <div className="nav-item">
                            <div className="button">
                                <i className="bi bi-moon"></i>
                            </div>
                        </div>
                        <div>
                            <div className="break"></div>
                        </div> */}
                        <div className="current_balance"></div>
                        <span>Current balance : </span>
                        <span>${balanceData.current_balence}</span>
                        <i className="bi bi-wallet"></i>
                    </div>
                </div>
            </div>
        </nav>

    );
};

export default NavBar;
