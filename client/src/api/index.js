const URL = "http://localhost:8000";

async function api(path) {
  return fetch(URL + path)
    .then(async (res) => {
      const response = await res.json();

      if (res.status !== 200) {
        return { success: false, message: response.message };
      }

      return { success: true, response: response };
    })
    .catch((err) => {
      return { success: false, message: err };
    });
}

export default api;
