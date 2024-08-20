import { Link } from "react-router-dom";

import { useCartContext } from "../../context/cart";
import { ProductsInCart } from "./productsInCart";

function Cart() {
  const { cartTotalPrice, cartProducts, viewCart } = useCartContext();

  if (!viewCart) return null;

  return (
    <div className="flex flex-col absolute top-16 right-0 h-[93vh] w-80 bg-gray-400 z-50">
      <div className="flex justify-between px-6 py-4 text-2xl font-bold bg-gray-900 text-white">
        <span>Total</span>
        <p>{cartTotalPrice}€</p>
      </div>

      {cartProducts?.map((product) => (
        <ProductsInCart key={product.id} {...product} />
      ))}

      <Link
        className="flex justify-center w-80 p-6 absolute bottom-0 right-0 bg-green-400"
        to="/verification"
      >
        Proceed to payment
      </Link>
    </div>
  );
}

export default Cart;
