import ProductsInPayment from "../components/payment/productsInPayment.jsx";
import { useCartContext } from "../context/cart/index.js";
import { useAuth } from "../context/admin.js";

import { Link } from "react-router-dom";
import Total from "../components/payment/total.jsx";
import Address from "../components/payment/address.jsx";

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
      <div className="flex gap-6">
        {cartProducts?.map((product) => {
          return <ProductsInPayment key={product.id} {...product} />;
        })}

        <Total />
      </div>

      <div>
        <Address />
      </div>
    </div>
  );
}

export default Payment;
