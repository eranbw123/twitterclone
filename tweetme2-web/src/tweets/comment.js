import React from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { apiTweetAction } from ".";
import Swal from "sweetalert2";

export const Comment = ({
  content,
  username,
  timestamp,
  id,
  tweetId,
  loadTweet,
}) => {
  var moment = require("moment");
  const timeAgo = moment(timestamp, "YYYY-MM-DD  HH:mm:ss:SSSSSS").fromNow();
  const handleCommentDeleteClick = (id) => {
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
          const handleCommentDeleted = (response, status) => {
            console.log(response);
            if (status === 200) {
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your Tweet has been deleted.",
                "success"
              );
              loadTweet(tweetId);
            } else {
              swalWithBootstrapButtons.fire("Something Went Wrong!");
            }
          };
          apiTweetAction(
            tweetId,
            "delete_comment",
            id,
            "",
            handleCommentDeleted
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
  };

  return (
    <div className="comment border">
      <h6>
        <Link
          to={`/profile/${username}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          {`@${username} `}
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
        {localStorage.getItem("username") === username && (
          <IconContext.Provider value={{ size: 18, color: "" }}>
            <RiDeleteBin5Fill
              onClick={() => handleCommentDeleteClick(id)}
              style={{ cursor: "pointer" }}
            />
          </IconContext.Provider>
        )}
      </h6>
      <p style={{ fontSize: "17px", paddingLeft: "7px" }}>{content}</p>
    </div>
  );
};
