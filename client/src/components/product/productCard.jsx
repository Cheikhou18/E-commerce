import React from "react";
import { useCartContext } from "../../context/cart";
import { Link } from "react-router-dom";
import "../../assets/css/Products.css";
import RecommendedBadge from "../RecommendedBadge";

function ProductCard(props) {
  const { product, children } = props;
  const { increaseProductQuantity } = useCartContext();

  return (
    <div className="bg-[#fff3d1] p-4 rounded-lg shadow-lg max-w-sm mx-auto my-4 transition-transform transform hover:-translate-y-2 hover:shadow-xl">
      <Link to={"/products/" + product.id} className="flex flex-col">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-contain mb-4"
        />


        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
          <p className="text-gray-700">
            Price:{" "}
            <span className="font-bold">
              {product.discount > 0
                ? (product.price * (1 - product.discount / 100)).toFixed(2)
                : product.price.toFixed(2)}
              €
            </span>
          </p>
          {product.discount > 0 && (
            <p className="text-green-600 font-semibold">
              {product.discount}% off!
            </p>
          )}
          {product.stock < 10 && (
            <p className="text-red-500">
              Warning: only {product.stock} left in stock!
            </p>
          )}

          {product.recommended && <RecommendedBadge />}
        </div>
      </Link>

      <div>{children}</div>


      <button
        onClick={() => increaseProductQuantity(product.id)}
        className="mt-4 py-2 px-4 bg-green-500 text-black rounded-md hover:bg-green-600 transition duration-300"
      >
        Add to cart
      </button>
    </div>
  );
}

export default ProductCard;
