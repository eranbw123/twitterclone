import React, { createRef } from "react";
import { Form, InputGroup, Button, FormControl } from "react-bootstrap";
import { BiSend } from "react-icons/bi";
import { IconContext } from "react-icons";
import { apiTweetAction } from "./lookup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const CommentCreate = ({ tweetId, loadTweet }) => {
  const testAreaRef = createRef();

  const handleSubmit = () => {
    const handleCreateComment = (response, status) => {
      if (status === 201) {
        loadTweet(tweetId);
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
    const action = "comment";
    const content = testAreaRef.current.value;
    if (content) {
      apiTweetAction(tweetId, action, "", content, handleCreateComment);
    }
  };
  return (
    <Form>
      <div className="create">
        <h3 style={{}}>Comments</h3>
        <InputGroup>
          <InputGroup>
            <Button variant="outline-secondary" onClick={handleSubmit}>
              <IconContext.Provider value={{ size: 20 }}>
                <BiSend />
              </IconContext.Provider>
            </Button>
            <FormControl as="textarea" ref={testAreaRef} required={true} />
          </InputGroup>
        </InputGroup>
      </div>
    </Form>
  );
};
