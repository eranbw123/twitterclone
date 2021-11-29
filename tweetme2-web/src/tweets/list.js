import React, { useEffect, useState } from "react";
import { apiTweetList } from "./lookup";
import { Tweet } from "./detail";

export const TweetList = (props) => {
  const [tweetsInit, setTweetsInit] = useState([]);
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    let final = [...props.newTweets].concat(tweetsInit);
    if (final.length !== tweets.length) {
      setTweets(final);
    }
  }, [props.newTweets, tweetsInit, tweets]);
  useEffect(() => {
    const handleTweetListLookup = (response, status) => {
      if (status === 200) {
        setTweetsInit(response);
      }
    };
    apiTweetList(props.username, handleTweetListLookup);
  }, [props.username]);

  const handleDidRetweet = (newTweet) => {
    console.log(1);
    const updatedTweetsInit = [...tweetsInit];
    updatedTweetsInit.unshift(newTweet);
    setTweetsInit(updatedTweetsInit);
    const updateFinalTweets = [...tweets];
    updateFinalTweets.unshift(newTweet);
    setTweets(updateFinalTweets);
  };

  return (
    <>
      {tweets.map((tweet, index) => {
        return (
          <Tweet
            didRetweet={handleDidRetweet}
            className=""
            tweet={tweet}
            key={tweet.id}
          />
        );
      })}
    </>
  );
};
