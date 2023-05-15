import { useEffect } from "react";

const InputTextArea = ({
  name,
  defaultValue,
  inputValue,
  onError,
  autoFocus,
  disable,
}) => {
  useEffect(() => {
    if (defaultValue) {
      inputValue(defaultValue);
    }
  }, [defaultValue]);
  const inputProps = {
    defaultValue: defaultValue || null,
    rows: "4",
    className:
      "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    onKeyUp: (event) => {
      inputValue(event.target.value);
    },
    onChange: (event) => {
      inputValue(event.target.value);
    },
    autoFocus: autoFocus,
    placeholder: name,
    className:
      "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light",
  };
  if (disable) {
    inputProps.readOnly = true;
  }
  return (
    <>
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {name}
      </label>
      <textarea {...inputProps}></textarea>
      {onError && (
        <div className="text-[#FF0000] font-semibold mb-2">{onError}</div>
      )}
    </>
  );
};

export default InputTextArea;
