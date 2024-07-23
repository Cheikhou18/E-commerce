import { get } from ".";

export async function getProducts() {
  return await get("/api/products");
}

export async function getProductById(id) {
  return await get("/api/products/" + id);
}
