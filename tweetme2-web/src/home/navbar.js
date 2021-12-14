import { React } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { RiLoginBoxFill, RiLogoutBoxFill } from "react-icons/ri";
import { BsTwitter } from "react-icons/bs";
import { IconContext } from "react-icons";
import { apiLogout } from "../user";

export const MainNavbar = (props) => {
  const handleLogout = () => {
    const handleServerReponse = (response, status) => {
      localStorage.clear();
      window.location.href = "/login";
    };
    apiLogout(handleServerReponse);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container fluid className="navbar-container">
          <Navbar.Brand href="/">
            <IconContext.Provider
              value={{ size: 35, color: "rgb(29,161,242)" }}
            >
              <BsTwitter />
            </IconContext.Provider>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Tweets</Nav.Link>
          </Nav>

          {localStorage.getItem("token") && (
            <Nav className="ms-auto">
              <Nav.Link href={`/profile/${localStorage.getItem("username")}`}>
                {localStorage.getItem("username")}
              </Nav.Link>
              <Nav.Link onClick={handleLogout}>
                <IconContext.Provider
                  value={{ size: 21, color: "rgb(220,220,220)" }}
                >
                  <RiLogoutBoxFill />
                </IconContext.Provider>
              </Nav.Link>
            </Nav>
          )}
          {!localStorage.getItem("token") && (
            <Nav>
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/login">
                <IconContext.Provider
                  value={{ size: 21, color: "rgb(220,220,220)" }}
                >
                  <RiLoginBoxFill />
                </IconContext.Provider>
              </Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
};
