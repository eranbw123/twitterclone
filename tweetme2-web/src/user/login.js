import React, { createRef } from "react";
import { Form, Button } from "react-bootstrap";
import { apiLogin } from ".";
import { apiUserDetail } from ".";

export const Login = (props) => {
  const refUsername = createRef();
  const refPassword = createRef();

  const handleLogin = (response, status) => {
    const handleUserDetails = (response, status) => {
      if (status === 200) {
        localStorage.setItem("username", response.username);
        localStorage.setItem("email", response.email);
        window.location.href = "/";
      }
    };
    console.log(status, response);
    if (status === 200) {
      const auth_token = response.auth_token;
      localStorage.setItem("token", auth_token);
      apiUserDetail(handleUserDetails);
    } else {
      alert("there was an error while trying to log in");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = refUsername.current.value;
    const password = refPassword.current.value;
    console.log(username, password);
    apiLogin(username, password, handleLogin);
  };

  return (
    <>
      {!localStorage.getItem("token") ? (
        <Form onSubmit={handleSubmit} className="col-12 col-md-8 mx-auto">
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              ref={refUsername}
              type="text"
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={refPassword}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mb-3">
            Submit
          </Button>
        </Form>
      ) : (
        <h2 className={"mt-3"}>You are alrealy logged in</h2>
      )}
    </>
  );
};
