export const backendLookup = async (method, endpoint, callback, data) => {
  let jsonData;
  if (data) {
    jsonData = JSON.stringify(data);
  }
  const url = `http://127.0.0.1:8000/api${endpoint}`;
  var response = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
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
