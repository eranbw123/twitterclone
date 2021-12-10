import { backendLookup } from "../lookup";

export const apiTweetCreate = (newTweet, callback) => {
  backendLookup("POST", "/tweets/create/", callback, { content: newTweet });
};

export const apiTweetDelete = (tweetId, callback) => {
  backendLookup("POST", `/tweets/${tweetId}/delete/`, callback);
};

export const apiTweetAction = (
  tweetId,
  action,
  commentId,
  content,
  callback
) => {
  const data = { id: tweetId, action: action };
  if (commentId) {
    data.comment_id = commentId;
  }
  if (content) {
    data.content = content;
  }
  console.log(data);
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
  backendLookup("GET", `/tweets/${tweetId}/`, callback);
};
