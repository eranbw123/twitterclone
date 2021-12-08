import React, { useEffect, useState, createRef } from "react";
import { Form, Row, Button, Col, ListGroup } from "react-bootstrap";
import { apiUserDetail, apiUserUpdate } from ".";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const UpdateProfile = (props) => {
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const refBio = createRef();
  const refLocation = createRef();
  const refEmail = createRef();
  const refFirstName = createRef();
  const refLastName = createRef();

  const handleUserDetails = (response, status) => {
    if (status === 200) {
      setEmail(response.user.email);
      setFirstName(response.user.first_name);
      setLastName(response.user.last_name);
      setBio(response.bio);
      setLocation(response.location);
    }
  };

  useEffect(() => {
    apiUserDetail(handleUserDetails);
  }, []);

  const handleBackendUpdate = (response, status) => {
    if (status === 200) {
    } else {
      var errorMessages = "";
      for (var key in response) {
        var value = response[key];
        for (var key2 in value) {
          const error =
            key2.charAt(0).toUpperCase() +
            key2.slice(1) +
            " - " +
            value[key2][0];
          errorMessages = errorMessages + error + "<br/>";
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
    apiUserUpdate(
      refLocation.current.value,
      refBio.current.value,
      refEmail.current.value,
      refFirstName.current.value,
      refLastName.current.value,
      handleBackendUpdate
    );
  };

  return (
    <Form className="col-12 col-md-8 mx-auto" onSubmit={handleSubmit}>
      <Form.Group as={Col}>
        <Form.Label className="mb-3">Username</Form.Label>
      </Form.Group>
      <Form.Group as={Col} className="mb-3">
        <ListGroup.Item>{localStorage.getItem("username")}</ListGroup.Item>
      </Form.Group>

      <Form.Group as={Col} className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          ref={refEmail}
          type="email"
          placeholder="Email"
          defaultValue={email}
        />
      </Form.Group>

      <Row className=" mb-3">
        <Form.Group as={Col}>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            ref={refFirstName}
            placeholder="First Name"
            defaultValue={firstName}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            ref={refLastName}
            placeholder="Last Name"
            defaultValue={lastName}
          />
        </Form.Group>
      </Row>
      <Row className=" mb-3">
        <Form.Group as={Col}>
          <Form.Label>Bio</Form.Label>
          <Form.Control ref={refBio} placeholder="Bio" defaultValue={bio} />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Location</Form.Label>
          <Form.Control
            ref={refLocation}
            placeholder="Location"
            defaultValue={location}
          />
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
};
