import React, { useEffect, useState } from "react";
import { getProductsByPopularity } from "../api/products";
import ProductCard from "../components/productCard";
import ProductUnavailable from "../components/productUnavailable";
import "../assets/css/Products.css";
import Navbar from "../components/navbar";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const request = await getProductsByPopularity();
      if (request.success) {
        setProducts(request.produits);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <Navbar />
      <h1>Top 3 Products</h1>
      <div className="products-grid">
        {products?.slice(0, 3).map((product) => (
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
  );
}

export default Home;
