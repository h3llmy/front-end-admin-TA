import React, { useState } from "react";
import Modal from "../modal/modal";

function Table({ headers, data, actions, errorMessage }) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const maxLength = 15;

  const stringDisplay = (string) => {
    return string
      .replace(/([A-Z])/g, " $1")
      .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  };

  const newHeaders = headers.map((header) => ({
    label: stringDisplay(header),
    key: header,
  }));

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {newHeaders.map((column) => (
                <th key={column.key} scope="col" className="px-6 py-2">
                  {column.label}
                </th>
              ))}
              {actions && (
                <th key="actions" scope="col" className="px-6 py-2">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {errorMessage ? (
              <tr>
                <td
                  className="px-6 py-4 font-medium text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-[#DC2626] whitespace-nowrap dark:text-[#DC2626]"
                  colSpan={newHeaders.length + (actions ? 1 : 0)}
                >
                  {errorMessage}
                </td>
              </tr>
            ) : data && data.length > 0 ? (
              data.map((row) => (
                <tr
                  key={row._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  {newHeaders.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {row[column.key]?.length > maxLength
                        ? `${row[column.key].substring(0, maxLength)}...`
                        : row[column.key] || ""}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-1 space-x-2">
                      {Object.keys(actions).map((action, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            actions[action](
                              row._id,
                              (modalContent) => {
                                setShowModal(true);
                                setModalContent(modalContent);
                              },
                              setShowModal,
                              setModalTitle
                            )
                          }
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          {stringDisplay(action)}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-6 py-4 font-medium text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-[#DC2626] whitespace-nowrap dark:text-[#DC2626]"
                  colSpan={newHeaders.length + (actions ? 1 : 0)}
                >
                  <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 animate-pulse dark:text-blue-200">
                    loading...
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <Modal
          onAccept={() => {
            setShowModal(false);
          }}
          onDecline={() => {
            setShowModal(false);
          }}
          content={modalContent}
          title={modalTitle}
        />
      )}
    </>
  );
}

export default Table;
