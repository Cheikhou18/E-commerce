import { useState } from "react";
import { useAuth } from "../../context/admin";
import { shippingData } from "../../api/delivery";
import { useCartContext } from "../../context/cart";

function Address() {
  const { user } = useAuth();
  const { setShippingFee } = useCartContext();
  const [address, setAddress] = useState({
    address: user.address,
    city: user.city,
    zipcode: user.zipcode,
  });

  const [message, setMessage] = useState();

  function handleChangeAddress(e) {
    setAddress((address) => {
      return { ...address, [e.target.name]: e.target.value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formIsComplete = Object.values(address).every(
      (value) => value !== ("" || undefined)
    );

    if (!formIsComplete) return setMessage("Please enter your address");

    const requestShippingFee = await shippingData(address);

    if (requestShippingFee?.response?.status === "OK") {
      const distance =
        requestShippingFee.response?.rows[0]?.elements[0]?.distance.value;

      setShippingFee((5 + 0.001 * distance).toFixed(0));
    }

    // const saveAddressToDB = await addAddress();
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
      <h3 className="text-lg font-medium">Shipping address</h3>

      {message}

      <div className="flex gap-4">
        <input
          type="text"
          defaultValue={user.lastname}
          placeholder="Last Name"
          className="border p-2"
        />

        <input
          type="text"
          defaultValue={user.firstname}
          placeholder="First Name"
          className="border p-2"
        />
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          defaultValue={user.address}
          onChange={(e) => handleChangeAddress(e)}
          name="address"
          placeholder="Address"
          className="border p-2"
        />

        <input
          type="text"
          defaultValue={user.city}
          onChange={(e) => handleChangeAddress(e)}
          name="city"
          placeholder="City"
          className="border p-2"
        />

        <input
          type="text"
          defaultValue={user.zipcode}
          onChange={(e) => handleChangeAddress(e)}
          name="zipcode"
          placeholder="Zipcode"
          className="border p-2"
        />
      </div>

      <button className="border px-4 py-2">Submit</button>
    </form>
  );
}

export default Address;
