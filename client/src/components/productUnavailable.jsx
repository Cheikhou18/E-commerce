import "../assets/css/Products.css";

function ProductUnavailable({ product }) {
  return (
    <>
    {console.log(product.image)}
      <img src={product.image} alt={product.name} className="product-image-grey" />
      <div className="product-details-grey">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">Price : {product.price}</p>
      </div>
    </>

  );
}

export default ProductUnavailable;
