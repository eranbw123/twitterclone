import { backendLookup } from "../lookup";

export const apiTweetCreate = (newTweet, callback) => {
  backendLookup("POST", "/tweets/create/", callback, { content: newTweet });
};

export const apiTweetAction = (tweetId, action, callback) => {
  const data = { id: tweetId, action: action };
  backendLookup("POST", "/tweets/action/", callback, data);
};

export const apiTweetList = (username, callback) => {
  let endpoint = "/tweets/";
  if (username) {
    endpoint = `/tweets/?username=${username}`;
  }
  backendLookup("GET", endpoint, callback);
};

export const apiTweetDetail = (tweetId, callback) => {
  console.log(tweetId);
  backendLookup("GET", `/tweets/${tweetId}/`, callback);
};
