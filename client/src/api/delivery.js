import { get, post, update } from ".";

export async function shippingData(data) {
  return await post("/api/ship", data);
}

export async function createDeliveryType(data) {
  return await post("/api/delivery", data);
}

export async function updateDeliveryType(data) {
  return await update("/api/delivery", data);
}

export async function getDeliveryTypes() {
  return await get("/api/delivery");
}
