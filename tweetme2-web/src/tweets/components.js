import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TweetList } from "./list";
import { TweetCreate } from "./create";
import { apiTweetDetail } from "./lookup";
import { Tweet } from "./detail";
import { apiTweetList } from ".";
import { CommentList } from "./commentList";
import { CommentCreate } from "./comment-create";

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

export const TweetPageComponent = (props) => {
  const { tweetId } = useParams();
  const [tweet, setTweet] = useState(null);
  const [test, setTest] = useState(null);
  const handleBackendLookup = (response, status) => {
    if (status === 200) {
      console.log(response);
      setTweet(response);
    } else {
      alert("there was an error finding your tweet");
    }
  };

  const loadTweet = (tweetId) => {
    apiTweetDetail(tweetId, handleBackendLookup);
  };

  useEffect(() => {
    loadTweet(tweetId);
  }, [tweetId]);

  return tweet === null ? null : (
    <>
      <Tweet tweet={tweet} className={props.className} />
      {localStorage.getItem("token") && (
        <CommentCreate tweetId={tweet.id} loadTweet={loadTweet} />
      )}
      <CommentList
        tweetId={tweet.id}
        comments={tweet.comments}
        loadTweet={loadTweet}
      />
    </>
  );
};
