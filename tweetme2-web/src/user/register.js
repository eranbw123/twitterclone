import React, { createRef } from "react";
import { Button, Form } from "react-bootstrap";
import { apiRegister } from "./lookup";

export const RegistrationForm = (props) => {
  const refUsername = createRef();
  const refEmail = createRef();
  const refPassword = createRef();

  const handleUserRegister = (response, status) => {
    console.log(status, response);
    if (status === 201) {
    } else {
      alert("there was an error while trying to register the user");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = refUsername.current.value;
    const email = refEmail.current.value;
    const password = refPassword.current.value;
    console.log(username, email, password);
    apiRegister(username, email, password, handleUserRegister);
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

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control ref={refEmail} type="email" placeholder="Enter email" />
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
