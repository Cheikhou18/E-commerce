import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function CategoryFilter({ onCategoryChange }) {
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
    onCategoryChange(event.target.value);
  };

  return (
    <Select
      value={categoryFilter}
      onChange={handleCategoryChange}
      displayEmpty
    >
      <MenuItem value="">All Categories</MenuItem>
      <MenuItem value="1">Sunglasses</MenuItem>
      <MenuItem value="2">Eyeglasses</MenuItem>
    </Select>
  );
}

export default CategoryFilter;
