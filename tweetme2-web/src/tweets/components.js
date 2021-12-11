import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TweetList } from "./list";
import { TweetCreate } from "./create";
import { apiTweetDetail } from "./lookup";
import { Tweet } from "./detail";
import { apiTweetList } from ".";
import { CommentList } from "./commentList";
import { CommentCreate } from "./comment-create";
import moment from "moment";

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
  var moment = require("moment");
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      ss: "%d seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      w: "a week",
      ww: "%d weeks",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years",
    },
  });

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
      <CommentCreate tweetId={tweet.id} loadTweet={loadTweet} />
      <CommentList
        tweetId={tweet.id}
        comments={tweet.comments}
        loadTweet={loadTweet}
      />
    </>
  );
};
