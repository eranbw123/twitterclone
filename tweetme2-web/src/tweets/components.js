import React, { useEffect, useState, createRef } from "react";
import { apiTweetList, apiTweetCreate, apiTweetAction } from "./lookup";

export const TweetsComponent = (props) => {
  const textAreaRef = createRef();
  const [newTweets, setNewTweets] = useState([]);

  const handleBackendUpdate = (response, status) => {
    // backend api response handeler
    let tempNewTweets = [...newTweets];
    if (status === 201) {
      tempNewTweets.unshift(response);
      setNewTweets(tempNewTweets);
    } else {
      console.log(response);
      alert("An error occured please try again");
    }
  };
  const handleSubmit = (event) => {
    //backend api request
    event.preventDefault();
    const newVal = textAreaRef.current.value;
    apiTweetCreate(newVal, handleBackendUpdate);
    textAreaRef.current.value = "";
  };
  return (
    <div className={props.className}>
      <div className="col-md-4 mx-auto col-10">
        <div className="row text-center">
          <h1>Welcome to Tweetme2</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            ref={textAreaRef}
            required={true}
            className="form-control"
            placeholder="Your Tweet"
          ></textarea>
          <button type="submit" className="btn btn-primary mb-3">
            Tweet
          </button>
        </form>
      </div>
      <TweetList newTweets={newTweets} />
    </div>
  );
};

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
    apiTweetList(handleTweetListLookup);
  }, []);

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

export const ActionBtn = ({ tweet, action, className, didPerformAction }) => {
  const likes = tweet.likes ? tweet.likes : 0;
  const display =
    action.type === "like" ? `${likes} ${action.display}` : action.display;

  const handleActionBackendEvent = (response, status) => {
    console.log(response, status);
    if ((status === 200 || status === 201) && didPerformAction) {
      console.log("clicked button");
      didPerformAction(response, status);
    }
  };

  const handleClick = () => {
    apiTweetAction(tweet.id, action.type, handleActionBackendEvent);
  };
  return (
    <button className={className} onClick={() => handleClick()}>
      {display}
    </button>
  );
};

export const ParentTweet = (props) => {
  return props.tweet.parent ? (
    <div className="row">
      <div className="col-11 mx-auto p-3 border rounded">
        <p className="mb-0 text-muted small">Retweet</p>
        <Tweet hideActions className={" "} tweet={props.tweet.parent} />
      </div>
    </div>
  ) : null;
};

export const Tweet = (props) => {
  const [actionTweet, setActionTweet] = useState(
    props.tweet ? props.tweet : null
  );
  const className = props.className
    ? props.className
    : "col-12 col-md-10 mx-auto border rounded py-3 mb-5 tweet ";
  const { id, content } = props.tweet;

  const handlePerformAction = (newActionTweet, status) => {
    console.log("handeling action", status);
    if (status === 200) {
      setActionTweet(newActionTweet);
    } else if (status === 201) {
      console.log("created");
      if (props.didRetweet) {
        console.log("calling didRetweet");
        props.didRetweet(newActionTweet);
      }
    }
  };

  return (
    <div className={className}>
      <div>
        <p>
          {id} - {content}
        </p>
        <ParentTweet tweet={props.tweet} />
      </div>
      {actionTweet && props.hideActions !== true && (
        <div className="btn btn-group">
          <ActionBtn
            tweet={actionTweet}
            action={{
              type: "like",
              display: "Likes",
            }}
            className="btn btn-primary btn-sm'"
            didPerformAction={handlePerformAction}
          />
          <ActionBtn
            tweet={actionTweet}
            action={{
              type: "unlike",
              display: "Unlike",
            }}
            className="btn btn-outline-primary btn-sm"
            didPerformAction={handlePerformAction}
          />
          <ActionBtn
            tweet={actionTweet}
            action={{
              type: "retweet",
              display: "Retweet",
            }}
            className="btn btn-outline-success btn-sm"
            didPerformAction={handlePerformAction}
          />
        </div>
      )}
    </div>
  );
};
