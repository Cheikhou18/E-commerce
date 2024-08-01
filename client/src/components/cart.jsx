import { useEffect, useState } from "react";

import { useCartContext } from "../context/cart";
import { ProductsInCart } from "./productsInCart";

function Cart() {
  const { productsInDB, cartProducts, viewCart } = useCartContext();

  if (!viewCart) return null;

  return (
    <div className="flex flex-col absolute top-16 right-0 h-[93vh] w-80 bg-gray-400">
      <div className="flex justify-between px-6 py-4 text-2xl font-bold bg-gray-900 text-white">
        <span>Total</span>
        {cartProducts.reduce((total, cartProduct) => {
          const product = productsInDB.find((i) => i.id === cartProduct.id);
          return total + (product?.price || 0) * cartProduct.quantity;
        }, 0)}
        €
      </div>

      {cartProducts?.map((product) => (
        <ProductsInCart key={product.id} {...product} />
      ))}
    </div>
  );
}

export default Cart;
