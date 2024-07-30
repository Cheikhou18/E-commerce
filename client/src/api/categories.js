import { get, post, remove, update } from ".";

export async function getCategories() {
  return await get("/api/categories");
}

export async function addCategory(data) {
  return await post("/api/categories", data);
}

export async function updateCategory(id, data) {
  return await update("/api/categories/" + id, data);
}

export async function deleteCategory(id) {
  return await remove("/api/categories/" + id);
}
