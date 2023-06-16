import { useState } from "react";

export default function Test() {
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const options = ["Option 1", "Option 2", "Option 3"];

  const handleSelect = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedValue || "Select an option"}</span>
        <svg
          className={`w-5 h-5 ml-2 ${isOpen ? "transform rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 12l-6-6H4a1 1 0 0 0 0 2h4l2 2 2-2h4a1 1 0 0 0 0-2h-1.414L10 12.586 5.707 8.293a1 1 0 1 0-1.414 1.414L10 15.414l4.707-4.707a1 1 0 0 0-1.414-1.414L11 12z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          <input
            type="text"
            className="w-full px-4 py-2 text-sm text-gray-700 focus:outline-none"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleInputChange}
          />
          <ul className="py-1">
            {filteredOptions.map((option) => (
              <li
                key={option}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
