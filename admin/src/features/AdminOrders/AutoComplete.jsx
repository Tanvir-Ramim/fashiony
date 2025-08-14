// Autocomplete.js
import React, { useState } from "react";

const Autocomplete = ({ options, handleSetQuery }) => {
  const [query, setQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    const filtered = options?.filter((option) =>
      option.zone_name.toLowerCase().includes(inputValue.toLowerCase())
    );
    console.log(filtered);
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option2) => {
    console.log(option2, "option2 handleClick");
    setQuery(option2);
    handleSetQuery(option2);
    setFilteredOptions([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Type City or Area Name"
        value={query}
        onChange={handleInputChange}
        className="block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      {filteredOptions.length > 0 && (
        <ul className="absolute left-0 z-10 w-full mt-2 overflow-auto bg-white border border-gray-300 rounded-md shadow-md h-80">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option.zone_name)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {option.zone_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
