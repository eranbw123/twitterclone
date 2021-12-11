import React from "react";

import { Tweet } from "./detail";

export const TweetList = ({ tweets, updateTweets }) => {
  return (
    <div style={{ marginTop: "35px" }}>
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
    </div>
  );
};
