import React, { useState } from "react";
import { updatePricePerKm } from "../api/delivery";

function DeliveryCostManager() {
  const [message, setMessage] = useState();
  const [pricePerKm, setPricePerKm] = useState(1); // Par défaut à 1€/km

  async function setNewPrice(e) {
    e.preventDefault();

    const request = await updatePricePerKm(pricePerKm);
    setMessage(request.response);
  }

  const handlePriceChange = (e) => {
    setPricePerKm(parseFloat(e.target.value));
  };

  return (
    <form onSubmit={(e) => setNewPrice(e)}>
      <h3 className="text-xl font-bold p-10">Delivery Cost</h3>

      {message}

      <input
        type="float"
        value={pricePerKm}
        onChange={handlePriceChange}
        placeholder="Price per kilometer"
      />

      <button>Submit</button>
    </form>
  );
}

export default DeliveryCostManager;
