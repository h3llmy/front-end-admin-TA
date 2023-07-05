import { useEffect } from "react";

const InputSelect = ({
  name,
  defaultValue,
  inputValue,
  onError,
  autoFocus,
  disable,
  options,
}) => {
  useEffect(() => {
    if (defaultValue) {
      inputValue(defaultValue[0]);
    }
  }, [defaultValue]);

  const inputProps = {
    defaultValue: defaultValue || "",
    onChange: (event) => {
      inputValue(event.target.value);
    },
    autoFocus: autoFocus,
    className:
      "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light",
  };

  if (disable) {
    inputProps.disabled = true;
  }

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {name}
      </label>
      <select {...inputProps}>
        {options &&
          options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
      </select>
      {onError && (
        <div className="text-[#FF0000] font-semibold mb-2">{onError}</div>
      )}
    </div>
  );
};

export default InputSelect;
