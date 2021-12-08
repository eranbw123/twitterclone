import React, { useEffect, useState } from "react";
import { TweetsComponent } from "../tweets";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { apiUserDetailGeneral } from ".";

export const Profile = (props) => {
  const { username } = useParams();
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [firstName, setFirstName] = useState(" ");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const handleUserDetailGeneral = (response, status) => {
      if (status === 200) {
        setFirstName(response.first_name ? response.first_name : "");
        setLastName(response.last_name ? response.last_name : "");
        setBio(response.bio ? response.bio : "");
        setLocation(response.location ? response.location : "");
      }
    };
    apiUserDetailGeneral(username, handleUserDetailGeneral);
  }, [username]);

  return (
    <>
      <Card className=" g">
        <Card.Body>
          <Card.Title>{`@${username}`}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{`Name - ${firstName} ${lastName}`}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">{`Location - ${location}`}</Card.Subtitle>
          <Card.Text>{`Bio - ${bio}`}</Card.Text>
          {localStorage.getItem("username") === username && (
            <Button variant="secondary" href="/profile">
              Edit
            </Button>
          )}
        </Card.Body>
      </Card>
      <TweetsComponent hideCreate={true} />
    </>
  );
};
