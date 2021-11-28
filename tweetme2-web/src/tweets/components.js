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
  return (
    <>
      {tweets.map((tweet, index) => {
        return <Tweet className="" tweet={tweet} key={tweet.id} />;
      })}
    </>
  );
};

export const ActionBtn = ({ tweet, action, className }) => {
  const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0);
  // const [userLike, setUserLike] = useState(false);
  const display =
    action.type === "like" ? `${likes} ${action.display}` : action.display;

  const handleActionBackendEvent = (response, status) => {
    console.log(response, status);
    if (status === 200) {
      setLikes(response.likes);
      // setUserLike(true)
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
        <Tweet className={" "} tweet={props.tweet.parent} />
      </div>
    </div>
  ) : null;
};

export const Tweet = (props) => {
  // col-10 mx-auto col-md-10 my-5 py-5 border bg-white text-dark
  const className = props.className
    ? props.className
    : "col-12 col-md-10 mx-auto border rounded py-3 mb-5 tweet ";
  const { id, content } = props.tweet;
  return (
    <div className={className}>
      <div>
        <p>
          {id} - {content}
        </p>
        <ParentTweet tweet={props.tweet} />
      </div>
      <div className="btn btn-group">
        <ActionBtn
          tweet={props.tweet}
          action={{
            type: "like",
            display: "Likes",
          }}
          className="btn btn-primary btn-sm'"
        />
        <ActionBtn
          tweet={props.tweet}
          action={{
            type: "unlike",
            display: "Unlike",
          }}
          className="btn btn-outline-primary btn-sm"
        />
        <ActionBtn
          tweet={props.tweet}
          action={{
            type: "retweet",
            display: "Retweet",
          }}
          className="btn btn-outline-success btn-sm"
        />
      </div>
    </div>
  );
};
