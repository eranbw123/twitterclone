import React, { createRef } from "react";
import { apiTweetCreate } from ".";
import { Button, InputGroup, FormControl, Form } from "react-bootstrap";
import { BiSend } from "react-icons/bi";
import { IconContext } from "react-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const TweetCreate = ({ updateTweets }) => {
  const textAreaRef = createRef();

  const handleBackendUpdate = (response, status) => {
    if (status === 201) {
      updateTweets(response);
    } else {
      var errorMessages = "";
      for (var key in response) {
        var value = response[key];
        for (var keyA in value) {
          var valueA = value[keyA];
          var errorA =
            key.charAt(0).toUpperCase() + key.slice(1) + " - " + valueA;
          errorMessages = errorMessages + errorA + "<br/>";
        }
      }
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        didOpen: () => {
          MySwal.clickConfirm();
        },
      }).then(() => {
        return MySwal.fire({
          icon: "error",
          title: "Validation Error",
          html: errorMessages,
          confirmButtonColor: "#1c1c1b",
        });
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newVal = textAreaRef.current.value;
    if (newVal) {
      apiTweetCreate(newVal, handleBackendUpdate);
    }
  };
  return (
    <>
      {localStorage.getItem("token") && (
        <Form>
          <div className="create">
            <InputGroup>
              <InputGroup>
                <Button variant="outline-secondary" onClick={handleSubmit}>
                  <IconContext.Provider value={{ size: 20 }}>
                    <BiSend />
                  </IconContext.Provider>
                </Button>
                <FormControl as="textarea" ref={textAreaRef} required={true} />
              </InputGroup>
            </InputGroup>
          </div>
        </Form>
      )}
    </>
  );
};
