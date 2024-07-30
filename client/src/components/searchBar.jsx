import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

function SearchBar({ onSearchChange, suggestions }) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  // Verify if input value is defined
  useEffect(() => {
    if (inputValue) {
      // If its defined we compare to suggestions and display the ones who matches
      setOptions(
        suggestions.filter((suggestion) =>
          suggestion.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    } else {
      setOptions([]);
    }
  }, [inputValue, suggestions]);

  // When input value changes we set the new value
  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    onSearchChange(newInputValue);
  };

  return (
    // we use Autocomplete to display suggestions
    <Autocomplete
      freeSolo
      options={options}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        // render each option with image, name and price
        <li {...props} key={option.id} className="search-option">
          <img
            src={option.image}
            alt={option.name}
            className="search-option-image"
          />
          <div className="search-option-text">
            <span className="search-option-name">{option.name}</span>
            <span className="search-option-price">{option.price}</span>
          </div>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          fullWidth
          label="Search"
        />
      )}
    />
  );
}

export default SearchBar;
