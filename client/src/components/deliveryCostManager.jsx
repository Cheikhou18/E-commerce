import React, { useEffect, useState } from "react";
import {
  createDeliveryType,
  getDeliveryTypes,
  updateDeliveryType,
} from "../api/delivery";

function DeliveryCostManager() {
  const [message, setMessage] = useState();
  const [existingDeliveryTypes, setExistingDeliveryTypes] = useState();
  const [selectedDelivery, setSelectedDelivery] = useState();
  const [delivery, setDelivery] = useState({
    delivery_type: "",
    price_per_km: parseFloat(1),
  });

  const [updatedDelivery, setUpdatedDelivery] = useState();

  useEffect(() => {
    requestDeliveryTypes();
  }, []);

  useEffect(() => {
    const timer = () =>
      setTimeout(() => {
        requestUpdateDelivery();
      }, 1000);

    return () => clearTimeout(timer);
  }, [updatedDelivery]);

  async function requestDeliveryTypes() {
    const request = await getDeliveryTypes();
    setExistingDeliveryTypes(request.response);
  }

  async function requestAddDelivery(e) {
    e.preventDefault();

    const request = await createDeliveryType(delivery);
    setMessage(request.response);

    getDeliveryTypes();
  }

  async function requestUpdateDelivery() {
    const request = await updateDeliveryType(updatedDelivery);
    setMessage(request.response);

    getDeliveryTypes();
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

        {existingDeliveryTypes ? (
          <div className="flex flex-col gap-3">
            <h2>Current delivery types</h2>

            <div className="flex gap-1">
              <select className="border px-4 py-2">
                {existingDeliveryTypes.map((delivery) => {
                  return (
                    <option
                      onChange={(e) => setSelectedDelivery(e.target.value)}
                      key={delivery.id}
                      value={delivery.delivery_type}
                    >
                      {delivery.delivery_type}
                    </option>
                  );
                })}
              </select>

              <input
                type="text"
                className="px-4 py-2 border"
                defaultValue={selectedDelivery?.price_per_km}
                onChange={(e) => setUpdatedDelivery(e.target.value)}
                placeholder="Price per km"
              />
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-3">
          <h2>Create a new delivery type</h2>

          <div className="flex gap-1">
            <input
              type="text"
              placeholder="Delivery name"
              className="border rounded-sm px-4 py-2"
              onChange={(e) =>
                setDelivery({ ...delivery, deliveryType: e.target.value })
              }
            />

            <input
              type="number"
              step="0.01"
              className="border rounded-sm px-4 py-2"
              defaultValue={delivery.price_per_km}
              onChange={handlePriceChange}
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
