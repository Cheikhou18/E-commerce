import React, { useEffect, useState } from "react";
import { getProducts, getProductsByPopularity } from "../api/products";
import ProductCard from "../components/productCard";
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
      <Navbar/>
      <h1>Top 3 Products</h1>
      <div className="products-grid">
        {products.slice(0, 3).map((product) => (
          <div className="product-card" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
