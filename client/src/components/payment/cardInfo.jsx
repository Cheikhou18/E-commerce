import { useState } from "react";

function CardInfo({ props }) {
  const { userInfo, setUserInfo, setSaveCVV, setCVV } = props;

  function handleChange(e) {
    setUserInfo((previous) => {
      return {
        ...previous,
        card: { ...previous?.card, [e.target.name]: e.target.value },
      };
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-medium">Card info</h3>

      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-2">
          <label>Card number</label>
          <input
            type="text"
            name="number"
            defaultValue={userInfo?.card?.number}
            onChange={(e) => handleChange(e)}
            placeholder="1234 5678 9012 3456"
            className="border p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Cardholder name</label>
          <input
            type="text"
            name="name"
            defaultValue={userInfo?.card?.name}
            onChange={(e) => handleChange(e)}
            placeholder="Cardholder Name"
            className="border p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Expiration date</label>
          <input
            type="month"
            name="date"
            defaultValue={userInfo?.card?.date}
            onChange={(e) => handleChange(e)}
            className="border p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>CVV</label>
          <input
            type="text"
            name="cvv"
            defaultValue={userInfo?.card?.cvv}
            onChange={(e) => setCVV(e.target.value)}
            className="border p-2"
          />
        </div>

        <div>
          <label>Save CVV</label>
          <input
            type="checkbox"
            onChange={(e) => setSaveCVV(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
}

export default CardInfo;
