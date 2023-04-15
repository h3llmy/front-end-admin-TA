import React, { useState } from "react";
import UpdateModal from "../components/modal/updateModal";

export default function MyComponent() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleAccept = () => {
    setShowModal(false);
  };

  const handleDecline = () => {
    setShowModal(false);
  };

  const handleButtonClick = (content, title) => {
    setModalContent(content);
    setModalTitle(title);
    setShowModal(true);
  };

  return (
    <>
      <button onClick={() => handleButtonClick("edit", "Edit")}>Edit</button>
      <button onClick={() => handleButtonClick("detail", "Detail")}>
        Detail
      </button>
      <button onClick={() => handleButtonClick("delete", "Delete")}>
        Delete
      </button>
      {showModal && (
        <UpdateModal
          onAccept={handleAccept}
          onDecline={handleDecline}
          content={modalContent}
          title={modalTitle}
        />
      )}
    </>
  );
}
