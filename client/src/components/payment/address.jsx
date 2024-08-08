import { useState } from "react";
import { useAuth } from "../../context/admin";

function Address() {
  const { user } = useAuth();
  const [address, setAddress] = useState({
    address: user.address,
    city: user.city,
    zipcode: user.zipcode,
  });

  function handleChangeAddress(e) {
    setAddress((address) => {
      return { ...address, [e.target.name]: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
      <h3 className="text-lg font-medium">Shipping address</h3>

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
    </form>
  );
}

export default Address;
