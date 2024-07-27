import { createContext, useContext, useEffect, useState } from "react";
import { post } from "../api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState();

  useEffect(() => {
    const cart = localStorage.getItem("cart");
  }, []);

  return (
    <CartContext.Provider value={{ cart }}>{children}</CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
