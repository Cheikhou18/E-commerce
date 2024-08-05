import { useAuth } from "../context/admin.js";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/cart/index.js";
import ProductsInPayment from "../components/productsInPayment.jsx";

function Payment() {
  const { user } = useAuth();
  const { cartProducts } = useCartContext();

  if (!user) {
    return (
      <form>
        <h3>Before proceeding to cart</h3>

        <button>Login</button>
        <Link>Continue without an account</Link>
      </form>
    );
  }

  return (
    <div>
      {cartProducts?.map((product) => {
        return <ProductsInPayment key={product.id} {...product} />;
      })}
    </div>
  );
}

export default Payment;
