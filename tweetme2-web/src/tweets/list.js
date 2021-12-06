import React from "react";

import { Tweet } from "./detail";

export const TweetList = ({ tweets, updateTweets }) => {
  return (
    <>
      {tweets.map((tweet, index) => {
        return (
          <Tweet
            updateTweets={updateTweets}
            className=""
            tweet={tweet}
            key={tweet.id}
          />
        );
      })}
    </>
  );
};
