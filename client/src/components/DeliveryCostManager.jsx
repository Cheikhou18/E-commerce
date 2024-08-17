import React, { useState } from 'react';

function DeliveryCostManager() {
  const [distance, setDistance] = useState('');
  const [deliveryCost, setDeliveryCost] = useState(null);

  const handleCalculate = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/delivery', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ distance: parseFloat(distance) }),
});


      const data = await response.json();
      if (data.success) {
        setDeliveryCost(data.shippingCost);
      } else {
        setDeliveryCost('Error calculating delivery cost');
      }
    } catch (error) {
      setDeliveryCost('Error calculating delivery cost');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold p-10">Calculate Delivery Cost</h3>
      <input
        type="number"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        placeholder="Enter distance"
      />
      <button onClick={handleCalculate}>Calculate</button>
      {deliveryCost !== null && (
        <p>Delivery Cost: {deliveryCost}€</p>
      )}
    </div>
  );
}

export default DeliveryCostManager;
