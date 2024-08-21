import { post } from ".";

export async function shippingData(data) {
  return await post("/api/ship", data);
}
