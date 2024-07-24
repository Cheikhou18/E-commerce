import { post } from ".";

export async function requestSignIn({ ...data }) {
  return await post("/api/signin", data);
}

export async function requestSignUp({ ...data }) {
  return await post("/api/signup", data);
}
