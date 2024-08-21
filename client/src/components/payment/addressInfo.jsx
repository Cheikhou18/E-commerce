import { useEffect, useState } from "react";
import { useAuth } from "../../context/admin";
import { shippingData } from "../../api/delivery";
import { useCartContext } from "../../context/cart";
import { updateAccount } from "../../api/user";

function Address() {
  const { user } = useAuth();
  const { setShippingFee } = useCartContext();

  const [address, setAddress] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    setAddress({
      firstname: user?.firstname,
      lastname: user?.lastname,
      address: user?.address,
      city: user?.city,
      zipcode: user?.zipcode,
    });
  }, [user]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateUser();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [address]);

  function handleChangeAddress(e) {
    setAddress((currentAddress) => {
      return { ...currentAddress, [e.target.name]: e.target.value };
    });
  }

  async function updateUser() {
    setMessage();

    const formIsComplete = Object.values(address).every(
      (value) => value !== ("" || undefined)
    );

    if (!formIsComplete) return setMessage("Please enter your address");

    const requestDistanceCalculation = await shippingData(address);
    // const getDeliveryPriceByKm = await getDeliveryPriceByKm();

    if (requestDistanceCalculation?.response?.status === "OK") {
      const distance =
        requestDistanceCalculation?.response?.rows[0]?.elements[0]?.distance
          ?.value;

      setShippingFee((5 + 0.001 * distance).toFixed(0));
    }

    // Update name and/or address
    await updateAccount(user?.id, { ...user, ...address });
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-medium">Shipping address</h3>

      {message}

      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          name="lastname"
          defaultValue={user?.lastname}
          onChange={(e) => handleChangeAddress(e)}
          placeholder="Last Name"
          className="border p-2"
        />

        <input
          type="text"
          name="firstname"
          defaultValue={user?.firstname}
          onChange={(e) => handleChangeAddress(e)}
          placeholder="First Name"
          className="border p-2"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          defaultValue={user?.address}
          onChange={(e) => handleChangeAddress(e)}
          name="address"
          placeholder="Address"
          className="border p-2"
        />

        <input
          type="text"
          defaultValue={user?.city}
          onChange={(e) => handleChangeAddress(e)}
          name="city"
          placeholder="City"
          className="border p-2"
        />

        <input
          type="text"
          defaultValue={user?.zipcode}
          onChange={(e) => handleChangeAddress(e)}
          name="zipcode"
          placeholder="Zipcode"
          className="border p-2"
        />
      </div>
    </div>
  );
}

export default Address;
