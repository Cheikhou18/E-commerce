import React, { useEffect, useState } from "react";
import { getProductsByPopularity } from "../api/products";
import ProductCard from "../components/product/productCard";
import ProductUnavailable from "../components/productUnavailable";
import "../assets/css/Products.css";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="text-center mb-7 mt-7">
          <h1 className="text-black font-bold">Myoptique</h1>
          <h2 className="font-medium text-gray-500 text-lg">A revolutionary glasses website</h2>
        </div>

        <div className="products-container">
          <div className="flex flex-col mb-10 text-center">
            <h2 className="font-semibold text-2xl">Best sellers</h2>
            <h3 className="font-medium text-gray-500 text-lg">Most popular glasses</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {products?.slice(0, 2).map((product) => (
              <div className="product-card" key={product.id}>
                {product.stock > 0 ? (
                  <ProductCard product={product} />
                ) : (
                  <ProductUnavailable product={product} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-20 mb-20">    
            <Link
              to="/products"
              className="bg-[#ffe8a3] text-gray-800 py-2 px-6 rounded-md shadow-lg hover:bg-[#fddc6f] transition duration-300"
            >
              All glasses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
