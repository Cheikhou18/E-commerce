import { useCartContext } from "../../context/cart";

function Total() {
  const { cartTotalPrice, shippingFee } = useCartContext();

  return (
    <div className="flex flex-col gap-2 px-4 py-2 border rounded-md w-48">
      <div className="flex justify-between text-lg font-medium">
        <p>Total</p>
        <p>{parseInt(cartTotalPrice) + parseInt(shippingFee)}€</p>
      </div>

      <div className="flex justify-between text-sm">
        <p>Products</p>
        <p>{cartTotalPrice}€</p>
      </div>

      <div className="flex justify-between text-sm">
        <p>Shipping</p>
        <p>{shippingFee}€</p>
      </div>

      {cartTotalPrice >= 1000 && (
        <label className="flex gap-1 text-sm">
          <input type="checkbox" />
          Gift wrapping
        </label>
      )}
    </div>
  );
}

export default Total;
