import { Link } from "react-router-dom";
import "../assets/css/Products.css";

function ProductCard(props) {
  const { product } = props;

  return (
    <Link to={"/products/" + product.id}>
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">Prix : {product.price}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
