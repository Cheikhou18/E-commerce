import { get, post, remove, update } from ".";

export async function getProducts() {
  return await get("/api/products");
}

export async function getProductsByPopularity() {
  return await get("/api/products/popular");
}

export async function getProductById(id) {
  return await get("/api/products/" + id);
}
export async function getProductByName(name) {
  return await get("/api/products/" + name);
}

export async function getSimilarProductsByColor(color, currentProductId) {
  return await get(`/api/products/similar/${color}/${currentProductId}`);
}

export async function getSimilarProductsByName(name, currentProductId) {
  return await get(`/api/products/similar-by-name/${name}/${currentProductId}`);
}

export async function addProduct(data) {
  return await post("/api/products", data);
}

export async function editProduct(id, data) {
  return await update("/api/products/" + id, data);
}

export async function deleteProduct(id) {
  return await remove("/api/products/" + id);
}
