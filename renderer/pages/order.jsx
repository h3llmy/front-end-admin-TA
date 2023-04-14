import React, { useState } from "react";
import UpdateModal from '../components/modal/updateModal';

export default function MyComponent() {
    const [showModal, setShowModal] = useState(false);

    const handleAccept = () => {
        setShowModal(false);
    };

    const handleDecline = () => {
        setShowModal(false);
    };

    return (
        <>
            <button onClick={() => setShowModal(true)}>Show modal</button>
            {showModal && (
                <UpdateModal onAccept={handleAccept} onDecline={handleDecline} />
            )}
        </>
    );
}
