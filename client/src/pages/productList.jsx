import React, { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ProductCard from "../components/productCard";
import SearchBar from "../components/searchBar";
import SortSelect from "../components/sortSelect";
import CategoryFilter from "../components/categoryFilter";
import FilteredProducts from "../components/filteredProducts";
import "../assets/css/Products.css";
import Navbar from "../components/navbar";
import ProductUnavailable from "../components/productUnavailable";


function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  

  useEffect(() => {
    async function fetchProducts() {
      const request = await getProducts();
      if (request.success) {
        setProducts(request.produits);
      }
    }
    fetchProducts();
  }, []);

  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleSortChange = (sortOrder) => {
    setSortOrder(sortOrder);
  };

  const handleCategoryChange = (categoryFilter) => {
    setCategoryFilter(categoryFilter);
  };


  const filteredProducts = FilteredProducts(
    products,
    searchTerm,
    sortOrder,
    categoryFilter
  );

  return (
    <div>
        <Navbar/>
    <div className="products-container">
      <h1>Products</h1>
      <div className="filters">
        <SearchBar onSearchChange={handleSearchChange} />
        <SortSelect onSortChange={handleSortChange} />
        <CategoryFilter onCategoryChange={handleCategoryChange} />
      </div>
      <div className="products-grid">
        {filteredProducts?.map((product) => (
          <div className="product-card" key={product.id}>
          {product.stock > 0 ? (
            <ProductCard product={product} />
          ) : (
            <ProductUnavailable product={product} />
          )}
        </div>
        ))}
      </div>
    </div>
        </div>
  );
}

export default ProductList;
