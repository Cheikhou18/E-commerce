import { useState, useEffect } from 'react';

function FilteredProducts(products, searchTerm, sortOrder, categoryFilter) {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filterProducts = () => {
      const filtered = products
        .filter((product) =>
          product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (categoryFilter === "" || product.id_category === parseInt(categoryFilter))
        )
        .sort((a, b) => {
          if (sortOrder === "asc") {
            return a.name.localeCompare(b.name);
          } else if (sortOrder === "desc") {
            return b.name.localeCompare(a.name);
          }
          return 0;
        });
      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [products, searchTerm, sortOrder, categoryFilter]);

  return filteredProducts;
}

export default FilteredProducts;
