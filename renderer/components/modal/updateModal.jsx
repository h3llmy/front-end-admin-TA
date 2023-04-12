import React from "react";

const UpdateModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close" onClick={onClose}>
                    Close
                </button>
                {children}
            </div>
        </div>
    );
};

export default UpdateModal;
