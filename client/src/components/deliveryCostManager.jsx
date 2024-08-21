import React, { useEffect, useState } from "react";
import {
  createDeliveryType,
  getDeliveryTypes,
  updateDeliveryType,
} from "../api/delivery";

function DeliveryCostManager() {
  const [message, setMessage] = useState();
  const [existingDeliveryTypes, setExistingDeliveryTypes] = useState();
  const [delivery, setDelivery] = useState({
    delivery_type: "",
    price_per_km: 0,
  });

  const [updatedDelivery, setUpdatedDelivery] = useState();

  useEffect(() => {
    requestDeliveryTypes();
  }, []);

  async function requestDeliveryTypes() {
    const request = await getDeliveryTypes();
    setExistingDeliveryTypes(request.response);
  }

  async function requestAddDelivery(e) {
    e.preventDefault();

    const request = await createDeliveryType(delivery);
    setMessage(request.response);

    requestDeliveryTypes();
  }

  async function requestUpdateDelivery() {
    const request = await updateDeliveryType(updatedDelivery);
    setMessage(request.response);

    requestDeliveryTypes();
  }

  const handlePriceChange = (e) => {
    setDelivery((currentDeliveryData) => {
      return {
        ...currentDeliveryData,
        price_per_km: parseFloat(e.target.value),
      };
    });
  };

  return (
    <form className="flex flex-col" onSubmit={(e) => requestAddDelivery(e)}>
      <h3 className="text-xl font-bold p-10">Delivery Management</h3>

      <div className="flex flex-col gap-4 p-7">
        <div>{message}</div>

        {existingDeliveryTypes?.map((delivery) => {
          return (
            <div key={delivery.id}>
              {delivery.delivery_type} : {delivery.price_per_km}€/km
            </div>
          );
        })}

        <div className="flex flex-col gap-3">
          <h2>Create a new delivery type</h2>

          <div className="flex gap-1">
            <input
              type="text"
              placeholder="Delivery name"
              name="delivery_type"
              className="border rounded-sm px-4 py-2"
              onChange={(e) =>
                setDelivery({ ...delivery, delivery_type: e.target.value })
              }
            />

            <input
              type="number"
              step="0.01"
              name="price_per_km"
              className="border rounded-sm px-4 py-2"
              defaultValue="0"
              onChange={(e) => handlePriceChange(e)}
              placeholder="Price per kilometer"
            />

            <button className="border rounded-sm px-6 py-2">Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default DeliveryCostManager;
