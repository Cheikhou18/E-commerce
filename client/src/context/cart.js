import { createContext, useContext, useEffect, useState } from "react";
import { post } from "../api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState();

  const cartQuantity = cart.reduce(
    (quantity, product) => product.quantity + quantity,
    0
  );

  function getProductQuantity(id) {
    return cart.find((product) => product.id === id)?.quantity || 0;
  }

  function increaseProductQuantity(id) {
    return setCart((currProducts) => {
      if (currProducts.find((product) => product.id === id) == null) {
        return [...currProducts, { id, quantity: 1 }];
      }

      return currProducts.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: product.quantity + 1 };
        }

        return product;
      });
    });
  }

  function decreaseProductQuantity(id) {
    setCart((currProducts) => {
      if (currProducts.find((product) => product.id === id)?.quantity === 1) {
        return currProducts.filter((product) => product.id !== id);
      }

      return cart.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: product.quantity - 1 };
        }

        return product;
      });
    });
  }

  function removeProductFromCart(id) {
    setCart((currProducts) => {
      return currProducts.filter((product) => product.id !== id);
    });
  }

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (cart) return setCart(JSON.stringify(localCart));
  }, [cart]);

  const values = {
    cart,
    cartQuantity,
    getProductQuantity,
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductFromCart,
  };

  return (
    <CartContext.Provider value={{ values }}>{children}</CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
