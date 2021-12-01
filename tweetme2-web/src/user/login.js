import React, { createRef } from "react";
import { Form, Button } from "react-bootstrap";
import { apiLogin } from ".";

export const Login = (props) => {
  const refUsername = createRef();
  const refPassword = createRef();

  const handleLogin = (response, status) => {
    console.log(status, response);
    if (status === 200) {
      const auth_token = response.auth_token;
      localStorage.setItem("token", auth_token);
      window.location.href = "/";
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
    <Form onSubmit={handleSubmit}>
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
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
