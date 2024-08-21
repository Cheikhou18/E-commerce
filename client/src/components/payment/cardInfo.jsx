import { useState } from "react";

function CardInfo() {
  const [message, setMessage] = useState();
  const [cardInfo, setCardInfo] = useState();

  function handleChange(e) {
    setCardInfo((currentcardInfo) => {
      return { ...currentcardInfo, [e.target.name]: e.target.value };
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-medium">Card info</h3>

      {message}

      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-2">
          <label>Card number</label>
          <input
            type="text"
            name="number"
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
            onChange={(e) => handleChange(e)}
            placeholder="Cardholder Name"
            className="border p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Expiration date</label>
          <input
            type="month"
            name="expiration date"
            onChange={(e) => handleChange(e)}
            className="border p-2"
          />
        </div>
      </div>
    </div>
  );
}

export default CardInfo;
