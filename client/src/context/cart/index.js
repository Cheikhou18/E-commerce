import { createContext, useContext, useEffect, useState } from "react";
import { post } from "../../api";

// Context of the shopping cart, it contains a context provider and a useContext
// With the functions you should be able to get the products quantities in the cart,
// add / remove a product and see the total price of the cart
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

  useEffect(() => {
    async function fetchProductsFromDB() {
      const request = await getProducts();
      if (request.success) setProductsInDB(request.produits);
    }
    fetchProductsFromDB();
  }, [cartProducts]);

  const cartQuantity = cartProducts.reduce(
    (quantity, product) => quantity + product.quantity,
    0
  );

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
    productsInDB,
    cartProducts,
    cartQuantity,
    getProductQuantity,
    increaseProductQuantity,
    decreaseProductQuantity,
    removeFromCart,
    viewCart,
    changeViewCart,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
}

export default CartProvider;
