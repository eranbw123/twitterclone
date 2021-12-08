import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TweetList } from "./list";
import { TweetCreate } from "./create";
import { apiTweetDetail } from "./lookup";
import { Tweet } from "./detail";
import { apiTweetList } from ".";

export const TweetsComponent = ({ hideCreate }) => {
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

  useEffect(updateTweets, [username]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {!hideCreate && <TweetCreate updateTweets={updateTweets} />}
      <TweetList updateTweets={updateTweets} tweets={tweets} />
    </>
  );
};

export const TweetDetailComponent = (props) => {
  const { tweetId } = useParams();
  const [tweet, setTweet] = useState(null);

  const handleBackendLookup = (response, status) => {
    if (status === 200) {
      setTweet(response);
    } else {
      alert("there was an error finding your tweet");
    }
  };

  useEffect(() => {
    apiTweetDetail(tweetId, handleBackendLookup);
  }, [tweetId]);

  return tweet === null ? null : (
    <Tweet tweet={tweet} className={props.className} />
  );
};
