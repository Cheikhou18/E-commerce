import { useCartContext } from "../../context/cart";

export function ProductsInCart({ id, quantity }) {
  const { productsInDB, removeFromCart } = useCartContext();
  const product = productsInDB.find((product) => product.id === id);

  if (!product) return null;

  return (
    <div className="flex m-4 p-4 justify-between items-center border">
      <img width="50px" src={product.image} alt={product.name} />

      <div className="flex-col">
        <span className="flex items-center">
          <h3 className="pr-2">{product.name}</h3>
          <span className="text-xs">x{quantity}</span>
        </span>

        <button className="text-xs" onClick={() => removeFromCart(id)}>
          Remove from cart
        </button>
      </div>

      <span className="p-1">
        {(
          product.price *
          quantity *
          (1 - (product?.discount / 100 || 0))
        ).toFixed(2)}
        €
      </span>
    </div>
  );
}
