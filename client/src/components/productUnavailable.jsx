import React from "react";
import { Link } from "react-router-dom";

function ProductUnavailable({ product }) {
  return (
    <div className="bg-[#fff3d1] p-4 rounded-lg shadow-lg max-w-sm mx-auto my-4 flex flex-col h-full">
      <div className="relative w-full h-64 mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover filter grayscale"
        />
      </div>

      <div className="flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-700">
          Price:{" "}
          <span className="font-bold">
            {product.price.toFixed(2)} €
          </span>
        </p>
        <div>
        <span>Product unavailable</span>
        </div>
      </div>
    </div>
  );
}

export default ProductUnavailable;
