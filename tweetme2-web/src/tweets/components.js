import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TweetList } from "./list";
import { TweetCreate } from "./create";
import { apiTweetDetail } from "./lookup";
import { Tweet } from "./detail";
import { apiTweetList } from "./lookup";

export const TweetsComponent = (props) => {
  const { username } = useParams();
  const [tweets, setTweets] = useState([]);

  const updateTweets = () => {
    const handleTweetListLookup = (response, status) => {
      if (status === 200) {
        setTweets(response);
      }
    };
    apiTweetList(username, handleTweetListLookup);
  };
  useEffect(() => {
    updateTweets();
  }, []);
  return (
    <>
      <TweetCreate updateTweets={updateTweets} />
      <TweetList updateTweets={updateTweets} tweets={tweets} />
    </>
  );
};

export const TweetDetailComponent = (props) => {
  const { tweetId } = useParams();
  const [tweet, setTweet] = useState(null);

  const handleBackendLookup = (response, status) => {
    if (status === 200) {
      console.log(response, status);
      setTweet(response);
    } else {
      alert("there was an error finding your tweet");
    }
  };

  useEffect(() => {
    apiTweetDetail(tweetId, handleBackendLookup);
  }, [tweetId]);

  return tweet === null ? null : <Tweet className={props.className} />;
};
