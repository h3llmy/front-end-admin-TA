import React from "react";

function Table({ headers, data, actions }) {
    const newHeaders = headers.map((header) => ({
        label: header.replace(/([A-Z])/g, " $1").replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
            letter.toUpperCase()
        ),
        key: header,
    }));

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {newHeaders.map((column) => (
                            <th key={column.key} scope="col" className="px-6 py-3">
                                {column.label}
                            </th>
                        ))}
                        {actions && (
                            <th key="actions" scope="col" className="px-6 py-3">
                                Action
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((row) => (
                            <tr key={row._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                {newHeaders.map((column) => (
                                    <td key={column.key} className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {row[column.key] || ""}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="px-6 py-2 space-x-5">
                                        {actions.includes("detail") && (
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                Detail
                                            </a>
                                        )}
                                        {actions.includes("update") && (
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                Edit
                                            </a>
                                        )}
                                        {actions.includes("delete") && (
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                Delete
                                            </a>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="px-6 py-4 font-medium text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-[#DC2626] whitespace-nowrap dark:text-[#DC2626]" colSpan={newHeaders.length + (actions ? 1 : 0)}>
                                Data not found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
