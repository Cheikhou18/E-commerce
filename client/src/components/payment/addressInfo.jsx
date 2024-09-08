function Address({ props }) {
  const { userInfo, setUserInfo } = props;

  function handleChangeAddress(e) {
    setUserInfo((previous) => {
      return {
        ...previous,
        address: { ...previous?.address, [e.target.name]: e.target.value },
      };
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-medium">Shipping address</h3>

      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          name="lastname"
          defaultValue={userInfo?.address?.lastname}
          onChange={(e) => handleChangeAddress(e)}
          placeholder="Last Name"
          className="border p-2"
        />

        <input
          type="text"
          name="firstname"
          defaultValue={userInfo?.address?.firstname}
          onChange={(e) => handleChangeAddress(e)}
          placeholder="First Name"
          className="border p-2"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          defaultValue={userInfo?.address?.address}
          onChange={(e) => handleChangeAddress(e)}
          name="address"
          placeholder="Address"
          className="border p-2"
        />

        <input
          type="text"
          defaultValue={userInfo?.address?.city}
          onChange={(e) => handleChangeAddress(e)}
          name="city"
          placeholder="City"
          className="border p-2"
        />

        <input
          type="text"
          defaultValue={userInfo?.address?.zipcode}
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
