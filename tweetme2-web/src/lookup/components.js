export const loadTweets = async (myCallback) => {
  const method = "GET";
  const url = "http://127.0.0.1:8000/api/tweets/";
  const response = await fetch(url, {
    method: method,
  });
  const tweets = await response.json();
  myCallback(tweets, response.status);
};
