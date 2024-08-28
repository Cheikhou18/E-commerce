import { createContext, useContext, useEffect, useState } from "react";
import { post } from "../../api";
import { useLocalStorage } from "./hooks/localStorage";
import { getProducts } from "../../api/products";

const CartContext = createContext({});

export function useCartContext() {
  return useContext(CartContext);
}

function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useLocalStorage("shopping_cart", []);
  const [productsInDB, setProductsInDB] = useState([]);
  const [viewCart, setViewCart] = useState(false);
  const [shippingFee, setShippingFee] = useState(5);

  useEffect(() => {
    fetchProductsFromDB();
  }, [cartProducts]);

  const cartQuantity = cartProducts.reduce(
    (quantity, product) => quantity + product.quantity,
    0
  );

  const cartTotalPrice = cartProducts.reduce((total, cartProduct) => {
    const product = productsInDB.find((i) => i.id === cartProduct.id);
    return total + (product?.price || 0) * cartProduct.quantity;
  }, 0);

  const GiftWrap = cartTotalPrice >= 1000; 

  async function fetchProductsFromDB() {
    const request = await getProducts();
    if (request.success) setProductsInDB(request.produits);
  }

  function getProductQuantity(id) {
    return cartProducts.find((product) => product.id === id)?.quantity || 0;
  }

  function increaseProductQuantity(id) {
    const currProductQuantity = getProductQuantity(id);
    const productsInStock =
      productsInDB?.find((product) => product.id === id)?.stock || 0;

    if (currProductQuantity >= productsInStock) return null;

    setCartProducts((currProducts) => {
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
    setCartProducts((currProducts) => {
      if (currProducts.find((product) => product.id === id)?.quantity === 1) {
        return currProducts.filter((item) => item.id !== id);
      }

      return currProducts.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: product.quantity - 1 };
        }

        return product;
      });
    });
  }

  function removeFromCart(id) {
    setCartProducts((currProduct) => {
      return currProduct.filter((product) => product.id !== id);
    });
  }

  function changeViewCart() {
    return setViewCart(!viewCart);
  }

  const values = {
    fetchProductsFromDB,
    productsInDB,
    cartProducts,
    cartQuantity,
    cartTotalPrice,
    GiftWrap,
    getProductQuantity,
    increaseProductQuantity,
    decreaseProductQuantity,
    removeFromCart,
    viewCart,
    changeViewCart,
    shippingFee,
    setShippingFee,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
}

export default CartProvider;
