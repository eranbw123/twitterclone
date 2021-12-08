import React, { createRef } from "react";
import { apiTweetCreate } from "./lookup";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { BiSend } from "react-icons/bi";
import { IconContext } from "react-icons";

export const TweetCreate = ({ className, updateTweets }) => {
  const textAreaRef = createRef();

  const handleBackendUpdate = (response, status) => {
    if (status === 201) {
      updateTweets(response);
    } else {
      console.log(response);
      alert("An error occured please try again");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(1);
    const newVal = textAreaRef.current.value;
    apiTweetCreate(newVal, handleBackendUpdate);
    textAreaRef.current.value = "";
  };
  return (
    <>
      {localStorage.getItem("token") && (
        <div className={className}>
          <div className="col-md-8 mb-5 mx-auto col-10">
            <InputGroup className="mb-3">
              <Button
                variant="outline-secondary"
                id="button-addon1"
                onClick={handleSubmit}
              >
                <IconContext.Provider value={{ size: 20 }}>
                  <BiSend />
                </IconContext.Provider>
              </Button>
              <FormControl
                ref={textAreaRef}
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                required={true}
              />
            </InputGroup>
          </div>
        </div>
      )}
    </>
  );
};
