import React, { useEffect, useState } from "react";
import { getProductsByPopularity } from "../api/products";
import Navbar from "../components/navbar";
import ProductCarousel from "../components/productCarousel"; 
import "../assets/css/Products.css";

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
      <ProductCarousel products={products.slice(0, 3)} />
    </div>
  );
}

export default Home;
