export const backendLookup = async (method, endpoint, callback, data) => {
  let jsonData;
  if (data) {
    jsonData = JSON.stringify(data);
  }
  const headers = {
    "Content-Type": "application/json",
  };
  const auth_token = localStorage.getItem("token");
  if (auth_token) {
    headers.Authorization = `Token ${auth_token}`;
  }
  const url = `http://127.0.0.1:8000/api${endpoint}`;
  const response = await fetch(url, {
    headers: headers,
    method: method,
    body: jsonData,
  });
  const serverResponse = await response.json();
  if (response.status === 403) {
    const detail = serverResponse.detail;
    if (detail === "Authentication credentials were not provided.") {
      window.location.href = "/login?showLoginRequired=true";
    }
  }
  callback(serverResponse, response.status);
};
