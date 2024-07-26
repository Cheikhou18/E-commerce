import { post, remove, update } from "..";

export async function createAccount(data) {
  return await post("/api/users", data);
}

export async function updateAccount(id, data) {
  return await update("/api/users/" + id, data);
}

export async function deleteAccount(id) {
  return await remove("/api/users" + id);
}

export async function createCategory(data) {
  return await post("/api/categories", data);
}

export async function editCategory(id, data) {
  return await update("/api/categories/" + id, data);
}

export async function deleteCategory(id) {
  return await remove("/api/categories/" + id);
}
