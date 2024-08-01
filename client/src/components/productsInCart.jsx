import { useCartContext } from "../context/cart";

export function ProductsInCart({ id, quantity }) {
  const { productsInDB, removeFromCart } = useCartContext();
  const product = productsInDB.find((product) => product.id === id);

  if (!product) return null;

  return (
    <div className="flex m-4 p-4 justify-between items-center border">
      <div className="flex-col">
        <span className="flex items-center">
          <h3 className="pr-2">{product.name}</h3>
          <span className="text-xs">x{quantity}</span>
        </span>

        <button className="text-xs" onClick={() => removeFromCart(id)}>
          Retirer du panier
        </button>
      </div>

      <span className="p-1">{product.price * quantity}€</span>
    </div>
  );
}
