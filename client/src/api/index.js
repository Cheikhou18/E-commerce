const URL = "http://localhost:8000";

async function api(method, path, data = {}) {
  return fetch(URL + path, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data }),
  })
    .then(async (res) => {
      const response = await res.json();
      return response;
    })
    .catch((err) => {
      return err;
    });
}

async function get(path, data = {}) {
  return await api("GET", path, data);
}

async function post(path, data = {}) {
  return await api("POST", path, data);
}

async function update(path, data = {}) {
  return await api("UPDATE", path, data);
}

async function remove(path, data = {}) {
  return await api("DELETE", path, data);
}

export { get, post, update, remove };
