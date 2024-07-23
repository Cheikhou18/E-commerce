import "../assets/css/Products.css";

function ProductCard({ product }) {
  return (
    <>
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">Prix : {product.price}</p>
      </div>
    </>
  );
}

export default ProductCard;
