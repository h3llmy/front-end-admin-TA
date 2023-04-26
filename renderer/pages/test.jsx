import { useState } from "react";
import InputDropdown from "../components/input/inputDropdown";

export default function Test() {
  const [selectedValue, setSelectedValue] = useState("");
  const [inputValue, setInputValue] = useState("Option 1");
  const options = [
    { _id: "1", name: "Option 1" },
    { _id: "2", name: "Option 2" },
    { _id: "3", name: "Option 3" },
    { _id: "4", name: "Option 4" },
  ];

  console.log(selectedValue);

  return (
    <div>
      <InputDropdown
        name="Select an option"
        options={options}
        displayKey={"name"}
        valueKey={"_id"}
        defaultValue={inputValue}
        selectedValue={setSelectedValue}
      />
    </div>
  );
}
