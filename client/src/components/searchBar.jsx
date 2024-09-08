import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SearchBar({ onSearchChange, suggestions }) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputValue) {
      setOptions(
        suggestions.filter((suggestion) =>
          suggestion.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    } else {
      setOptions([]);
    }
  }, [inputValue, suggestions]);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    onSearchChange(newInputValue);
  };

  const handleOptionSelect = (event, value) => {
    if (value) {
      navigate(`/products/${value.id}`);
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={options}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleOptionSelect}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <li
          {...props}
          key={option.id}
          className="flex items-center p-2 hover:bg-gray-100 cursor-pointer transition-all rounded-lg"
        >
          <img
            src={option.image}
            alt={option.name}
            className="w-12 h-12 object-cover rounded-full mr-3"
          />
          <div className="flex flex-col">
            {/* Product name */}
            <span className="font-medium text-gray-700">{option.name}</span>
            {/* Product price */}
            <span className="text-sm text-gray-500">{option.price}</span>
          </div>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          fullWidth
          label="Search"
          className="rounded-full border-gray-300"
          InputProps={{
            ...params.InputProps,
            classes: {
              root: 'rounded-full',
            },
          }}
        />
      )}
    />
  );
}

export default SearchBar;
