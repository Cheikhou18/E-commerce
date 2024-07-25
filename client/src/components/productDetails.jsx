function ProductDetails(product) {
  const { name, description, price, stock } = product;

  return (
    <div>
      <h2>{name}</h2>
    </div>
  );
}

export default ProductDetails;
