import { useEffect, useState } from "react";

import { useAuth } from "../context/admin.js";
import { useCartContext } from "../context/cart/index.js";

import { shippingData } from "../api/delivery.js";

import Total from "../components/payment/total.jsx";
import CardInfo from "../components/payment/cardInfo.jsx";
import Address from "../components/payment/addressInfo.jsx";
import ProductsInPayment from "../components/payment/productsInPayment.jsx";
import { updateAccount } from "../api/user.js";

function Payment() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const { cartProducts, setShippingFee } = useCartContext();
  const [message, setMessage] = useState({ address: "", card: "" });

  async function handleSubmit() {
    setMessage({ address: "", card: "" });

    const addressIsComplete = Object.values(userInfo.address).every(
      (value) => value !== ("" || undefined || null)
    );
    const cardIsComplete = Object.values(userInfo.card).every(
      (value) => value !== ("" || undefined || null)
    );

    if (!addressIsComplete)
      return setMessage((previous) => {
        return { ...previous, address: "Please insert a valid address" };
      });

    if (!cardIsComplete)
      return setMessage((previous) => {
        return { ...previous, card: "Please fill the card fields" };
      });

    calculateDistance();

    if (user?.id) {
      const request = await updateAccount(user.id, {
        ...user,
        ...userInfo.address,
        card: { ...userInfo.card },
      });
    }
  }

  async function calculateDistance() {
    const requestDistanceCalculation = await shippingData(userInfo?.address);
    const result = requestDistanceCalculation?.response?.rows[0]?.elements[0];

    if (result?.status === "OK") {
      const distance = result?.distance?.value / 1000; // Convert m to km
      setShippingFee((5 + 1 * distance).toFixed(0));
    }
  }

  useEffect(() => {
    setUserInfo({
      address: {
        firstname: user?.firstname,
        lastname: user?.lastname,
        address: user?.address,
        city: user?.city,
        zipcode: user?.zipcode,
      },
      card: {
        number: user?.card[0]?.number,
        date: user?.card[0]?.date,
        name: user?.card[0]?.name,
        cvv: user?.card[0]?.cvv,
      },
    });

    console.log(user);
  }, [user]);

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

      <button
        onClick={handleSubmit}
        className="border rounded-md px-12 py-2 w-fit"
      >
        Pay
      </button>
    </div>
  );
}

export default Payment;
