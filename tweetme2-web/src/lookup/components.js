export const backendLookup = async (method, endpoint, callback, data) => {
  let jsonData;
  if (data) {
    jsonData = JSON.stringify(data);
  }
  const url = `http://127.0.0.1:8000/api${endpoint}`;
  const csrftoken = getCookie();
  if (csrftoken) {
    var headers = {
      "Content-Type": "application/json",
      HTTP_X_REQUESTED_WITH: "XMLHttpRequest",
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRFToken": csrftoken,
    };
  }
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

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
