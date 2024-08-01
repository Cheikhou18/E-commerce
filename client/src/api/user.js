import { remove, update } from ".";

export async function updateAccount(id, data) {
  return await update("/api/users/" + id, data);
}

export async function deleteAccount(id) {
  return await remove("/api/users" + id);
}
