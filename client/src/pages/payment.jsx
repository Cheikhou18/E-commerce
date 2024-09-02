import Total from "../components/payment/total.jsx";
import { useCartContext } from "../context/cart/index.js";
import Address from "../components/payment/addressInfo.jsx";
import ProductsInPayment from "../components/payment/productsInPayment.jsx";
import CardInfo from "../components/payment/cardInfo.jsx";
import { useState } from "react";

function Payment() {
  const { cartProducts } = useCartContext();
  const [userInfo, setUserInfo] = useState({
    address: { address: "" },
    card: {},
  });

  return (
    <div className="flex flex-col gap-6 p-10">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">Cart</h3>

          {cartProducts?.map((product) => (
            <ProductsInPayment key={product.id} {...product} />
          ))}
        </div>

        <Total />
      </div>

      <Address props={{ userInfo, setUserInfo }} />
      <CardInfo props={{ userInfo, setUserInfo }} />

      <button className="border rounded-md px-12 py-2 w-fit">Pay</button>
    </div>
  );
}

export default Payment;
