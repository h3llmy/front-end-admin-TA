import { useEffect, useState } from "react";

export default function InputDropdown({
  name,
  options,
  defaultValue,
  selectedValue,
  displayKey,
  valueKey,
  disable,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isValidOption, setIsValidOption] = useState(true);

  const filteredOptions =
    options.length > 0 &&
    options.filter((option) =>
      option[displayKey].toLowerCase().includes(searchValue.toLowerCase())
    );

  const filtereDefaultValue =
    options.length > 0 &&
    options.filter(
      (option) =>
        defaultValue &&
        option[displayKey].toLowerCase().includes(defaultValue.toLowerCase())
    );
  useEffect(() => {
    if (filtereDefaultValue.length !== 0 && options.length > 0) {
      selectedValue(filtereDefaultValue[0][valueKey]);
      setSearchValue(filtereDefaultValue[0][displayKey]);
    }
  }, [options]);

  const handleOptionClick = (option) => {
    selectedValue(option[valueKey]);
    setSearchValue(option[displayKey]);
    setIsOpen(false);
    setIsValidOption(true);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setIsValidOption(
      options.length > 0 &&
        options.some(
          (option) =>
            option[displayKey].toLowerCase() ===
            event.target.value.toLowerCase()
        )
    );
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  useEffect(() => {
    if (!isOpen && !isValidOption && options.length > 0) {
      if (filtereDefaultValue.length !== 0) {
        selectedValue(filtereDefaultValue[0][valueKey]);
        setSearchValue(filtereDefaultValue[0][displayKey]);
      } else {
        selectedValue();
        setSearchValue("");
      }
    }
  }, [isValidOption, isOpen]);

  return (
    <div className="relative">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {name}
      </label>
      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          disabled={disable}
          placeholder={name}
          className="
            shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
            dark:focus:border-blue-500 dark:shadow-sm-light
          "
        />
        {isOpen && (
          <div
            className="
              absolute z-10 top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg
              shadow-lg mt-2 overflow-y-auto max-h-60 dark:bg-gray-800 dark:border-gray-600
              dark:shadow-sm-light
            "
          >
            {options.length > 0 &&
              filteredOptions.map((option) => (
                <div
                  key={option[valueKey]}
                  className="
                  cursor-pointer py-1.5 px-2.5 hover:bg-gray-200 dark:hover:bg-gray-700
                  whitespace-nowrap
                "
                  onClick={() => handleOptionClick(option)}
                >
                  {option[displayKey]}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
