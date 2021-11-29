import React from "react";
import { apiTweetAction } from "./lookup";

export const ActionBtn = ({ tweet, action, className, didPerformAction }) => {
  const likes = tweet.likes ? tweet.likes : 0;
  const display =
    action.type === "like" ? `${likes} ${action.display}` : action.display;

  const handleActionBackendEvent = (response, status) => {
    console.log(response, status);
    if ((status === 200 || status === 201) && didPerformAction) {
      console.log("clicked button");
      didPerformAction(response, status);
    }
  };

  const handleClick = () => {
    apiTweetAction(tweet.id, action.type, handleActionBackendEvent);
  };
  return (
    <button className={className} onClick={() => handleClick()}>
      {display}
    </button>
  );
};
