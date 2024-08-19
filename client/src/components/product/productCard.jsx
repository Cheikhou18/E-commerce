import React from "react";
import { useCartContext } from "../../context/cart";
import { Link } from "react-router-dom";
import "../../assets/css/Products.css";
import RecommendedBadge from "../RecommendedBadge"; // Importez le composant

function ProductCard(props) {
  const { product } = props;
  const { increaseProductQuantity } = useCartContext();

  return (
    <div className="relative flex flex-col">
      <Link to={"/products/" + product.id}>
        <img src={product.image} alt={product.name} className="product-image" />

        <div className="product-details">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-price">Price : {product.price}</p>

          {product.stock < 10 && (
            <p className="stock-warning text-red-500">
              Warning: only {product.quantity} left in stock!
            </p>
          )}

          {product.recommended && <RecommendedBadge />}
        </div>

        {/* Affiche le badge si recommandé */}
      </Link>

      <button
        onClick={() => increaseProductQuantity(product.id)}
        className="p-4 rounded-md bg-green-400 hover:bg-green-800"
      >
        Add to cart
      </button>
    </div>
  );
}

export default ProductCard;
