import React, { createRef } from "react";
import { apiTweetCreate } from "./lookup";

export const TweetCreate = (props) => {
  const textAreaRef = createRef();
  const { didTweet } = props;

  const handleBackendUpdate = (response, status) => {
    if (status === 201) {
      didTweet(response);
    } else {
      console.log(response);
      alert("An error occured please try again");
    }
  };
  const handleSubmit = (event) => {
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
    </div>
  );
};
