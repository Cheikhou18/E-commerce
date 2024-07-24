import api from ".";

export async function requestSignIn() {
  const request = await api("/api/signin");

  if (request.success === false) {
    return { success: false, message: request.message };
  }

  return { success: true, response: request.response };
}

export function requestSignUp() {
  const request = api("/api/signup");

  if (request.success === false) {
    return { success: false, message: request.message };
  }

  return { success: true, response: request.response };
}
