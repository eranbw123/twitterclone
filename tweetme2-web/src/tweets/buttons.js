import React from "react";
import { apiTweetAction } from ".";
import { BiLike, BiDislike } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { IconContext } from "react-icons";
import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

export const ActionBtn = ({ tweet, action, className, didPerformAction }) => {
  const likes = tweet.likes ? tweet.likes : 0;
  var display;
  switch (action.type) {
    case "like":
      display = (
        <>
          {likes} <BiLike />
        </>
      );
      break;
    case "unlike":
      display = <BiDislike />;
      break;
    case "retweet":
      display = <FaRetweet />;
      break;
    default:
  }

  const handleActionBackendEvent = (response, status) => {
    if ((status === 200 || status === 201) && didPerformAction) {
      didPerformAction(response, status);
    }
  };

  const handleClick = () => {
    if (action.type !== "retweet") {
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
          cancelButtonText: "cencel",
          confirmButtonText: "retweet",
          inputPlaceholder: "Type your message here...",
          inputAttributes: {
            "aria-label": "Type your message here",
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            const handleActionBackendEventRetweet = (response, status) => {
              if (status === 201 && didPerformAction) {
                didPerformAction(response, status);
              } else {
                swalWithBootstrapButtons.fire(response.Content);
              }
            };
            console.log(result.value);
            apiTweetAction(
              tweet.id,
              action.type,
              "",
              result.value,
              handleActionBackendEventRetweet
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
