import { post, update } from ".";

export async function shippingData(data) {
  return await post("/api/ship", data);
}

export async function updatePricePerKm(data) {
  return await update("/api/delivery", data);
}
