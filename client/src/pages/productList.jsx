import React, { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ProductCard from "../components/product/productCard";
import SearchBar from "../components/searchBar";
import SortSelect from "../components/sortSelect";
import CategoryFilter from "../components/category/categoryFilter";
import FilteredProducts from "../components/filteredProducts";
import "../assets/css/Products.css";
import ProductUnavailable from "../components/productUnavailable";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Fetch the API and send it to const "products"
  useEffect(() => {
    async function fetchProducts() {
      const request = await getProducts();
      if (request.success) {
        setProducts(request.produits);
      }
    }
    fetchProducts();
  }, []);

  // Handle the changes on the searchBar
  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  // Handle the changes on the sortList
  const handleSortChange = (sortOrder) => {
    setSortOrder(sortOrder);
  };
  // Handle the changes on the categoryList
  const handleCategoryChange = (categoryFilter) => {
    setCategoryFilter(categoryFilter);
  };

  const filteredProducts = FilteredProducts(
    products,
    searchTerm,
    sortOrder,
    categoryFilter
  );

  // Define all suggestions with the name, image, and price of the products
  const allSuggestions = products.map((product) => ({
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
  }));

  return (
    <div>
      <div className="products-container">
        <h1>Products</h1>
        {/* When search changes we call suggestions and handleSearchChange, same for sort and categories */}
        <div className="filters">
          <SearchBar
            onSearchChange={handleSearchChange}
            suggestions={allSuggestions}
          />
          <SortSelect onSortChange={handleSortChange} />
          <CategoryFilter onCategoryChange={handleCategoryChange} />
        </div>
        <div className="products-grid">
          {/* call either ProductCard or ProductUnavailable */}
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
