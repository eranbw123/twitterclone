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
  console.log(url);
  console.log("data", jsonData);
  const response = await fetch(url, {
    headers: headers,
    method: method,
    body: jsonData,
  });
  console.log(response);
  if (response.status === 204) {
    callback(response, response.status);
  } else {
    const serverResponse = await response.json();
    console.log("response ", serverResponse, " status ", response.status);
    console.log(serverResponse, response.status);
    callback(serverResponse, response.status);
  }
};
