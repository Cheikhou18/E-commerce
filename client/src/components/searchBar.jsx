import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SearchBar({ onSearchChange, suggestions }) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();  // useNavigate pour naviguer

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

  // Handle the option selection and navigate to product details page
  const handleOptionSelect = (event, value) => {
    if (value) {
      navigate(`/products/${value.id}`);
    }
  };

  return (
    // use Autocomplete to display suggestions
    <Autocomplete
      freeSolo
      options={options}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleOptionSelect} // handle option selection
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
