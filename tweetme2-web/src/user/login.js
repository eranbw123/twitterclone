import React, { createRef } from "react";
import { Form, Button } from "react-bootstrap";
import { apiLogin } from ".";
import { apiUserDetail } from ".";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const Login = (props) => {
  const refUsername = createRef();
  const refPassword = createRef();

  const handleLogin = (response, status) => {
    const handleUserDetails = (response, status) => {
      if (status === 200) {
        localStorage.setItem("username", response.user.username);
        window.location.href = "/";
      }
    };
    console.log(status, response);
    if (status === 200) {
      const auth_token = response.auth_token;
      localStorage.setItem("token", auth_token);
      apiUserDetail(handleUserDetails);
    } else {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        didOpen: () => {
          MySwal.clickConfirm();
        },
      }).then(() => {
        return MySwal.fire({
          icon: "error",
          title: "Validation Error",
          html: "Invalid username or password",
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
    apiLogin(username, password, handleLogin);
  };

  return (
    <>
      {!localStorage.getItem("token") ? (
        <Form onSubmit={handleSubmit} className="form">
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
          <Button variant="primary" type="submit" className="mb-3">
            Log In
          </Button>
        </Form>
      ) : (
        <h2 className={"mt-3"}>You are alrealy logged in</h2>
      )}
    </>
  );
};
