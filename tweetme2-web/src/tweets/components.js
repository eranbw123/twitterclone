import React, { useEffect, useState, createRef } from "react";
import { apiTweetList, apiTweetCreate } from "./lookup";

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
      <div className="col-12 mb-3">
        <form onSubmit={handleSubmit}>
          <textarea
            ref={textAreaRef}
            required={true}
            className="form-control"
          ></textarea>
          <button type="submit" className="btn btn-primary my-3">
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

export const ActionBtn = ({ tweet, action }) => {
  const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0);
  const [userLike, setUserLike] = useState(false);
  const display =
    action.type === "like" ? `${likes} ${action.display}` : action.display;

  const handleClick = () => {
    if (action.type === "like") {
      if (userLike) {
        setLikes(likes - 1);
        setUserLike(!userLike);
      } else {
        setLikes(likes + 1);
        setUserLike(!userLike);
      }
    }
  };
  return (
    <button className="btn btn-primary btn-sm" onClick={() => handleClick()}>
      {display}
    </button>
  );
};

export const Tweet = ({ tweet }) => {
  const { id, content } = tweet;
  return (
    <div className="col-10 mx-auto col-md-10 my-5 py-5 border bg-white text-dark">
      <p>
        {id} - {content}
      </p>
      <div className="btn btn-group">
        <ActionBtn tweet={tweet} action={{ type: "like", display: "Likes" }} />
        <ActionBtn
          tweet={tweet}
          action={{ type: "unlike", display: "Unlike" }}
        />
        <ActionBtn
          tweet={tweet}
          action={{ type: "retweet", display: "Retweet" }}
        />
      </div>
    </div>
  );
};
