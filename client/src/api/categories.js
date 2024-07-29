import { get, post } from ".";

export async function getCategories() {
  return await get("/api/categories");
}

export async function addCategory(data) {
  return await post("/api/categories", data);
}
