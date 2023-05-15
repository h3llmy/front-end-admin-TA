import { useEffect } from "react";

const InputText = ({
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
    type: "text",
    defaultValue: defaultValue || null,
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
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {name}
      </label>
      <input {...inputProps} />
      {onError && (
        <div className="text-[#FF0000] font-semibold mb-2">{onError}</div>
      )}
    </div>
  );
};

export default InputText;
