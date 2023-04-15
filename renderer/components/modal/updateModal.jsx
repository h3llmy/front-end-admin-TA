import React from "react";

export default function UpdateModal({ onAccept, onDecline, title, content }) {
  return (
    <div
      id="staticModal"
      data-modal-backdrop="static"
      tabIndex="-1"
      aria-hidden="true"
      className="w-screen h-screen fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white w-full md:max-w-2xl z-100 mx-4 md:mx-auto rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 bg-gray-200 border-b border-gray-300">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-900 focus:outline-none"
            onClick={onDecline}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="px-6 py-4">
          <div className="text-gray-700">{content}</div>
        </div>
        <div className="px-6 py-4 bg-gray-200 border-t border-gray-300 flex justify-end items-center">
          <button
            type="button"
            className="mr-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo"
            onClick={onAccept}
          >
            Accept
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray"
            onClick={onDecline}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
