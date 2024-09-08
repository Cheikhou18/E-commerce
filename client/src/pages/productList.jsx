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
      <div className="flex flex-col justify-center items-center p-6 md:p-12">
        <h1 className="text-center font-bold text-2xl mb-6">Products</h1>

        <div className="filters mb-6 flex flex-col gap-4 md:flex-row md:items-center">
          <SearchBar
            onSearchChange={handleSearchChange}
            suggestions={allSuggestions}
            className="w-full md:w-1/3"
          />
          <SortSelect
            onSortChange={handleSortChange}
            className="w-full md:w-1/3"
          />
          <CategoryFilter
            onCategoryChange={handleCategoryChange}
            className="w-full md:w-1/3"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
