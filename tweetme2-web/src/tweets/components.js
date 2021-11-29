import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { TweetList } from "./list";
import { TweetCreate } from "./create";

export const TweetsComponent = (props) => {
  const { username } = useParams();
  const [newTweets, setNewTweets] = useState([]);

  const handleNewTweet = (newTweet) => {
    // backend api response handeler
    let tempNewTweets = [...newTweets];
    tempNewTweets.unshift(newTweet);
    setNewTweets(tempNewTweets);
  };

  return (
    <>
      <TweetCreate didTweet={handleNewTweet} />
      <TweetList newTweets={newTweets} username={username} />
    </>
  );
};
