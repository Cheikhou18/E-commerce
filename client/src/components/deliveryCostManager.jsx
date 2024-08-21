import React, { useState } from "react";
import { updatePricePerKm } from "../api/delivery";

function DeliveryCostManager() {
  const [message, setMessage] = useState();
  const [pricePerKm, setPricePerKm] = useState(1); // Par défaut à 1€/km

  async function setNewPrice() {
    const request = await updatePricePerKm(pricePerKm);
    if (request.success) setMessage("Price updated successfully.");
  }

  const handlePriceChange = (e) => {
    setPricePerKm(parseFloat(e.target.value));
  };

  return (
    <div>
      <h3 className="text-xl font-bold p-10">Delivery Cost</h3>

      <input
        type="float"
        value={pricePerKm}
        onChange={handlePriceChange}
        placeholder="Price per kilometer"
      />
    </div>
  );
}

export default DeliveryCostManager;
