import React from "react";
import { apiTweetAction } from "./lookup";
import { BiLike, BiDislike } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { IconContext } from "react-icons";

export const ActionBtn = ({ tweet, action, className, didPerformAction }) => {
  const likes = tweet.likes ? tweet.likes : 0;
  var display;
  switch (action.type) {
    case "like":
      display = (
        <>
          {likes} <BiLike />
        </>
      );
      break;
    case "unlike":
      display = <BiDislike />;
      break;
    case "retweet":
      display = <FaRetweet />;
      break;
    default:
  }

  const handleActionBackendEvent = (response, status) => {
    if ((status === 200 || status === 201) && didPerformAction) {
      didPerformAction(response, status);
    }
  };

  const handleClick = () => {
    apiTweetAction(tweet.id, action.type, handleActionBackendEvent);
  };
  return (
    <button className={className} onClick={() => handleClick()}>
      <IconContext.Provider value={{ size: 20 }}>
        {display}
      </IconContext.Provider>
    </button>
  );
};
