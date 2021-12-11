import React from "react";
import { apiTweetAction } from ".";
import { BiLike, BiDislike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import { IconContext } from "react-icons";
import Swal from "sweetalert2";

export const ActionBtn = ({ tweet, action, className, didPerformAction }) => {
  const likes = tweet.likes ? tweet.likes : 0;
  const comments = tweet.comments ? tweet.comments : 0;
  var display;
  switch (action.type) {
    case "like":
      display = (
        <>
          <span style={{ fontSize: "17px" }}>{likes}</span> <BiLike />
        </>
      );
      break;
    case "unlike":
      display = <BiDislike />;
      break;
    case "retweet":
      display = <FaRetweet />;
      break;
    case "comment":
      display = (
        <>
          <span style={{ fontSize: "17px" }}>{comments}</span>
          <span style={{ paddingLeft: "6px" }}>
            <FaRegComment />
          </span>
        </>
      );
      break;
    default:
  }

  const handleActionBackendEvent = (response, status) => {
    if ((status === 200 || status === 201) && didPerformAction) {
      didPerformAction(response, status);
    }
  };

  const handleClick = () => {
    if (action.type !== "retweet" && action.type !== "comment") {
      apiTweetAction(tweet.id, action.type, "", "", handleActionBackendEvent);
    } else {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          input: "textarea",
          showCancelButton: true,
          cancelButtonText: "cancel",
          confirmButtonText: action.type,
          inputPlaceholder: "Type your message here...",
          inputAttributes: {
            "aria-label": "Type your message here",
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            const handleActionBackendEventRetweetComment = (
              response,
              status
            ) => {
              if (status === 201 && didPerformAction) {
                didPerformAction(response, status);
              } else {
                swalWithBootstrapButtons.fire({
                  title: "Validation Error",
                  text: response.content[0],
                });
              }
            };
            console.log(result.value);
            apiTweetAction(
              tweet.id,
              action.type,
              "",
              result.value,
              handleActionBackendEventRetweetComment
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
          }
        });
    }
  };
  return (
    <button className={className} onClick={() => handleClick()}>
      <IconContext.Provider value={{ size: 20 }}>
        {display}
      </IconContext.Provider>
    </button>
  );
};
