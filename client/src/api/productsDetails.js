import api from ".";

export async function getProductDetails(id) {
  const request = await api("/products/:id", id);

  if (request.success === false) {
    return { success: false, message: request.message };
  }

  return { success: true, products: request.response };
}
