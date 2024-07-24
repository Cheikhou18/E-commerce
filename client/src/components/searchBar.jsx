import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function SearchBar({ onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearchChange(event.target.value);
  };

  return (
    <TextField
      id="search"
      variant="outlined"
      fullWidth
      label="Search"
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
}

export default SearchBar;
