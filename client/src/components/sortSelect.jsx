import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function SortSelect({ onSortChange }) {
  const [sortOrder, setSortOrder] = useState("");

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    onSortChange(event.target.value);
  };

  return (
    <Select
      value={sortOrder}
      onChange={handleSortChange}
      displayEmpty
    >
      <MenuItem value="">Sort by</MenuItem>
      <MenuItem value="asc">Alphabetical (A-Z)</MenuItem>
      <MenuItem value="desc">Alphabetical (Z-A)</MenuItem>
    </Select>
  );
}

export default SortSelect;
