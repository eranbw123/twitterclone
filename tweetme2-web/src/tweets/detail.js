import React, { useState } from "react";
import { ActionBtn } from "./buttons";

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
