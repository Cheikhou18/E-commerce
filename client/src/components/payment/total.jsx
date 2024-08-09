import { useCartContext } from "../../context/cart";

function Total() {
  const { productsInDB, cartProducts } = useCartContext();

  return (
    <div>
      <p>
        Total:{" "}
        {cartProducts.reduce((total, cartProduct) => {
          const product = productsInDB.find((i) => i.id === cartProduct.id);
          return total + (product?.price || 0) * cartProduct.quantity;
        }, 0)}
        €
      </p>

      <button>Proceed to payment</button>
    </div>
  );
}

export default Total;
