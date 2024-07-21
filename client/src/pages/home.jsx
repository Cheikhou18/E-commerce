import React, { useEffect, useState } from 'react';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/products')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(data.produits);
      });
  }, []);

  return (
    <div className="products-container">
      <h1>Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">Prix : {product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
