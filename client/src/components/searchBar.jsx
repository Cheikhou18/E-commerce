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
          suggestion.toLowerCase().includes(inputValue.toLowerCase())
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
