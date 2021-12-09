import React, { createRef } from "react";
import { Button, Form, Col, Row, FloatingLabel } from "react-bootstrap";
import { apiUserCreate } from "./lookup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const RegistrationForm = (props) => {
  const refUsername = createRef();
  const refPassword = createRef();
  // const [bio, setBio] = useState("");
  // const [location, setLocation] = useState("");
  // const [email, setEmail] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const refBio = createRef();
  const refLocation = createRef();
  const refEmail = createRef();
  const refFirstName = createRef();
  const refLastName = createRef();

  const handleUserCreate = (response, status) => {
    console.log(status, response);
    if (status === 201) {
      window.location.href = "/login";
    } else {
      var errorMessages = "";
      for (var key in response) {
        var value = response[key];
        if (typeof value[0] !== "string") {
          for (var key2 in value) {
            var value1 = value[key2];
            for (var key3 in value1) {
              var value2 = value1[key3];
              var error =
                key2.charAt(0).toUpperCase() + key2.slice(1) + " - " + value2;
              errorMessages = errorMessages + error + "<br/>";
            }
          }
        } else {
          for (var key2 in value) {
            var value1 = value[key2];
            var error =
              key.charAt(0).toUpperCase() + key.slice(1) + " - " + value1;
            errorMessages = errorMessages + error + "<br/>";
          }
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
    apiUserCreate(
      refLocation.current.value,
      refBio.current.value,
      refUsername.current.value,
      refPassword.current.value,
      refEmail.current.value,
      refFirstName.current.value,
      refLastName.current.value,
      handleUserCreate
    );
  };

  return (
    <>
      {!localStorage.getItem("token") ? (
        <Form onSubmit={handleSubmit} className="form">
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formBasicUsername">
              <Form.Label>
                Username
                <span className="tooltip1 required">
                  *<span className="tooltiptext">Required</span>
                </span>
              </Form.Label>
              <Form.Control
                ref={refUsername}
                type="text"
                placeholder="Enter username"
                required={true}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                Password
                <span className="tooltip1 required">
                  *<span className="tooltiptext">Required</span>
                </span>
              </Form.Label>
              <Form.Control
                ref={refPassword}
                type="password"
                placeholder="Password"
                required={true}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control ref={refEmail} type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Location</Form.Label>
              <Form.Control ref={refLocation} placeholder="Location" />
            </Form.Group>
          </Row>
          <Row className=" mb-3">
            <Form.Group as={Col}>
              <Form.Label>First Name</Form.Label>
              <Form.Control ref={refFirstName} placeholder="First Name" />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control ref={refLastName} placeholder="Last Name" />
            </Form.Group>
          </Row>
          <FloatingLabel
            controlId="floatingTextarea2"
            label="Bio"
            className=" mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              ref={refBio}
              placeholder="Bio"
            />
          </FloatingLabel>

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
