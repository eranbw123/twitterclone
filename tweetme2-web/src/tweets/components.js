import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TweetList } from "./list";
import { TweetCreate } from "./create";
import { apiTweetDetail } from "./lookup";
import { Tweet } from "./detail";

export const TweetsComponent = (props) => {
  const { username } = useParams();
  const [newTweets, setNewTweets] = useState([]);

  const handleNewTweet = (newTweet) => {
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

export const TweetDetailComponent = (props) => {
  const { tweetId } = useParams();
  // const [didLookup, setDidLookup] = useState(false);
  const [tweet, setTweet] = useState(null);

  const handleBackendLookup = (response, status) => {
    if (status === 200) {
      setTweet(response);
    } else {
      alert("there was an error finding your tweet");
    }
  };

  useEffect(() => {
    // if (didLookup === true) {
    apiTweetDetail(tweetId, handleBackendLookup);
    // setDidLookup(true);
    // }
  }, [tweetId]);

  return tweet === null ? null : (
    <Tweet tweet={tweet} className={props.className} />
  );
};
