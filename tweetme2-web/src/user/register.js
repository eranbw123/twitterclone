import React, { createRef } from "react";
import { Button, Form } from "react-bootstrap";
import { apiRegister } from "./lookup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const RegistrationForm = (props) => {
  const refUsername = createRef();
  const refPassword = createRef();

  const handleUserRegister = (response, status) => {
    console.log(status, response);
    if (status === 201) {
      window.location.href = "/login";
    } else {
      console.log(response);
      var errorMessages = "";
      for (var key in response) {
        var value = response[key];
        const error =
          key.charAt(0).toUpperCase() + key.slice(1) + " - " + value[0];
        errorMessages = errorMessages + error + "<br/>";
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
    const username = refUsername.current.value;
    const password = refPassword.current.value;
    console.log(username, password);
    apiRegister(username, password, handleUserRegister);
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
              required={true}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={refPassword}
              type="password"
              placeholder="Password"
              required={true}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      ) : (
        <h2 className={"mt-3"}>Logged in user cannot register</h2>
      )}
    </>
  );
};
