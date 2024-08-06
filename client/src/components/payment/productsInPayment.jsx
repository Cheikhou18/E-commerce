import { useCartContext } from "../../context/cart";

function ProductsInPayment({ id, quantity }) {
  const {
    productsInDB,
    increaseProductQuantity,
    decreaseProductQuantity,
    removeFromCart,
  } = useCartContext();
  const product = productsInDB.find((product) => product.id === id);

  if (!product) return null;

  return (
    <div className="flex m-4 p-4 justify-between items-center border">
      <div className="flex gap-4">
        <img width="130px" src={product.image} alt={product.name} />

        <div>
          <h4 className="text-lg">{product.name}</h4>
          <p>Color: {product.color}</p>
          <p>
            Quantity:{" "}
            <button
              className="text-lg text-blue-400"
              onClick={() => decreaseProductQuantity(id)}
            >
              -
            </button>{" "}
            {quantity}{" "}
            <button
              className="text-lg text-blue-400"
              onClick={() => increaseProductQuantity(id)}
            >
              +
            </button>
          </p>

          <p>{product.price * quantity}€</p>

          <button
            className="text-sm text-blue-400"
            onClick={() => removeFromCart(id)}
          >
            Remove from cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsInPayment;
