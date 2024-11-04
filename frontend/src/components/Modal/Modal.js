import React, { useState, useEffect } from 'react';
import './Modal.css';
import CreateOperation from "../CreateOperation/CreateOperation";

const Modal = ({ isOpen, onClose, children }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
        } else {
            // Start fade-out animation, then hide modal after it completes
            const timeout = setTimeout(() => setVisible(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    return (
        <>
            <div className={`modal-overlay ${isOpen ? 'modal-fade-in' : 'modal-fade-out'}`} onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close" onClick={onClose}>✖</button>
                    {children}
                </div>

            </div>
        </>
    );
};

export default Modal;
