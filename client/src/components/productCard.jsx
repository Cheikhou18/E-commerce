import { useCartContext } from "../context/cart";

import { Link } from "react-router-dom";
import "../assets/css/Products.css";

function ProductCard(props) {
  const { product } = props;
  const { increaseProductQuantity } = useCartContext();

  return (
    <div className="flex flex-col">
      <Link to={"/products/" + product.id}>
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-details">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-price">Price : {product.price}</p>
        </div>
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
