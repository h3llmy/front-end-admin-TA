import { useEffect, useState } from "react";
import Modal from "../modal/modal";

export default function ModalButton({ label, title, content, color }) {
  const [showModal, setShowModal] = useState(false);
  const [showContent, setModalContents] = useState(false);
  useEffect(() => {
    content(setModalContents, setShowModal);
  }, []);
  return (
    <>
      <button
        type="button"
        className={`${
          color ? color : "bg-gray-500 hover:bg-gray-600"
        } px-4 py-1 text-white rounded-lg focus:outline-none focus:shadow-outline-gray`}
        onClick={() => {
          setShowModal(true);
        }}
      >
        {label}
      </button>
      {showModal && (
        <Modal
          title={title}
          content={showContent}
          onDecline={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}
