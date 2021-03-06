import React, { useState } from "react";
import { ActionBtn } from "./buttons";
import { Link } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { apiTweetDelete } from ".";
import Swal from "sweetalert2";
// import moment from "moment";

export const ParentTweet = (props) => {
  return props.tweet.parent ? (
    <div className="row">
      <div className="col-11 mx-auto p-3 border rounded">
        <Tweet hideActions className={" "} tweet={props.tweet.parent} />
      </div>
    </div>
  ) : null;
};

export const Tweet = (props) => {
  const [actionTweet, setActionTweet] = useState(
    props.tweet ? props.tweet : null
  );
  const className = props.className ? props.className : "tweet border";
  const { id, content, username } = props.tweet;
  var moment = require("moment");
  const timeAgo = moment(
    props.tweet.timestamp,
    "YYYY-MM-DD  HH:mm:ss:SSSSSS"
  ).fromNow();
  const handlePerformAction = (newActionTweet, status) => {
    if (status === 200) {
      setActionTweet(newActionTweet);
    } else if (status === 201) {
      setActionTweet(newActionTweet);
      props.updateTweets();
    }
  };

  const handleTweetDeleteClick = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No, cancel!",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          const handleTweetDelete = (response, status) => {
            if (status === 200) {
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your Tweet has been deleted.",
                "success"
              );
              props.updateTweets();
            } else {
              swalWithBootstrapButtons.fire("Something Went Wrong!");
            }
          };
          apiTweetDelete(id, handleTweetDelete);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
  };

  return (
    <div className={className}>
      <Link
        to={`/tweet/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div>
          <h6>
            {props.tweet.parent && (
              <p className="mb-0 text-muted small">Retweet</p>
            )}
            <Link
              to={`/profile/${username}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {`@${username}`}
            </Link>
            <span
              style={{
                paddingRight: "10px",
                paddingLeft: "2px",
                fontWeight: "normal",
              }}
              className="text-muted small"
            >
              {timeAgo}
            </span>
            <Link to="/">
              {localStorage.getItem("username") === username &&
                !props.hideActions && (
                  <IconContext.Provider
                    value={{ size: 18, textDecoration: "none", color: "black" }}
                  >
                    <RiDeleteBin5Fill
                      onClick={() => handleTweetDeleteClick(id)}
                      style={{ cursor: "pointer", marginBottom: "2.5px" }}
                    />
                  </IconContext.Provider>
                )}
            </Link>
          </h6>
          <p style={{ marginLeft: "13px", marginBottom: "5px" }}>
            <Link
              to={`/tweet/${id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {content}
            </Link>
          </p>
          <ParentTweet tweet={props.tweet} />
        </div>
      </Link>

      {actionTweet && props.hideActions !== true && (
        <div className="btn btn-group">
          <ActionBtn
            tweet={actionTweet}
            action={{
              type: "like",
            }}
            className="btn btn-primary btn-sm'"
            didPerformAction={handlePerformAction}
          />
          <ActionBtn
            tweet={actionTweet}
            action={{
              type: "unlike",
            }}
            className="btn btn-outline-danger btn-sm"
            didPerformAction={handlePerformAction}
          />
          {!props.tweet.is_retweet && (
            <ActionBtn
              tweet={actionTweet}
              action={{
                type: "retweet",
              }}
              className="btn btn-success btn-sm"
              didPerformAction={handlePerformAction}
            />
          )}
          <ActionBtn
            tweet={actionTweet}
            action={{
              type: "comment",
            }}
            className="btn btn-secondary btn-sm"
            didPerformAction={handlePerformAction}
          />
        </div>
      )}
    </div>
  );
};
