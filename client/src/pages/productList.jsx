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

  const isNewProduct = (creationDate) => {
    const productDate = new Date(creationDate);
    const currentDate = new Date();
    const differenceInTime = currentDate - productDate;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays <= 3;
  };

  const filteredProducts = FilteredProducts(
    products,
    searchTerm,
    sortOrder,
    categoryFilter
  );

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
        <div className="filters">
          <SearchBar
            onSearchChange={handleSearchChange}
            suggestions={allSuggestions}
          />
          <SortSelect onSortChange={handleSortChange} />
          <CategoryFilter onCategoryChange={handleCategoryChange} />
        </div>
        <div className="products-grid">
          {filteredProducts?.map((product) => (
            <div className="product-card" key={product.id}>
              {product.stock > 0 ? (
                <ProductCard product={product}>
                  {isNewProduct(product.creation_date.date) && (
                    <span className="text-red-500 ml-2">NEW</span>
                  )}
                </ProductCard>
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
