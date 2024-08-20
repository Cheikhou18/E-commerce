import ProductsInPayment from "../components/payment/productsInPayment.jsx";
import { useCartContext } from "../context/cart/index.js";
import { useAuth } from "../context/admin.js";

import { useHistory, useNavigate } from "react-router-dom";
import Total from "../components/payment/total.jsx";
import Address from "../components/payment/address.jsx";
import { useEffect } from "react";

function Payment() {
  const { user } = useAuth();
  const { cartProducts } = useCartContext();

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">Cart</h3>

          {cartProducts?.map((product) => {
            return <ProductsInPayment key={product.id} {...product} />;
          })}
        </div>

        <div>
          <Total />
        </div>
      </div>

      <div>
        <Address />
      </div>
    </div>
  );
}

export default Payment;
