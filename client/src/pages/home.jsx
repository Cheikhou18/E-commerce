import "../assets/css/Products.css";

import React, { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ProductCard from "../components/productCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const request = await getProducts();

      if (request.success) {
        setProducts(request.produits);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <h1>Products</h1>

      <div className="products-grid">
        {products?.map((product) => (
          <div className="product-card" key={product.id}>
            <ProductCard props={{ product }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
