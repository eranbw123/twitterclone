import React, { useState } from "react";
import { ActionBtn } from "./buttons";
import { Link } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { apiTweetDelete } from ".";
import Swal from "sweetalert2";

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
  const className = props.className ? props.className : "tweet border";
  const { id, content, username } = props.tweet;

  const handlePerformAction = (newActionTweet, status) => {
    if (status === 200) {
      setActionTweet(newActionTweet);
    } else if (status === 201) {
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
                "Your file has been deleted.",
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
      <div>
        <h6>
          <Link
            to={`/profile/${username}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            {`@${username}`}{" "}
          </Link>
          {localStorage.getItem("username") === username && (
            <IconContext.Provider value={{ size: 18, color: "" }}>
              <RiDeleteBin5Fill
                onClick={() => handleTweetDeleteClick(id)}
                style={{ cursor: "pointer" }}
              />
            </IconContext.Provider>
          )}
        </h6>
        <Link
          to={`/tweet/${id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <p className="container-fluid ">{content}</p>
        </Link>
        <ParentTweet tweet={props.tweet} />
      </div>
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
            className="btn btn-outline-secondary btn-sm"
            didPerformAction={handlePerformAction}
          />
          <ActionBtn
            tweet={actionTweet}
            action={{
              type: "retweet",
            }}
            className="btn btn-outline-success btn-sm"
            didPerformAction={handlePerformAction}
          />
        </div>
      )}
    </div>
  );
};
