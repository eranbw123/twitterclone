import { React } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { RiLoginBoxFill, RiLogoutBoxFill } from "react-icons/ri";
import { BsTwitter } from "react-icons/bs";
import { IconContext } from "react-icons";

export const MainNavbar = (props) => {
  const handleLogout = () => {
    localStorage.clear();
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
          <Nav>
            <Nav.Link href="/">Tweets</Nav.Link>
          </Nav>

          {localStorage.getItem("token") && (
            <Nav className="ms-auto">
              <Nav.Link href={`/profile/${localStorage.getItem("username")}`}>
                {localStorage.getItem("username")}
              </Nav.Link>
              <Nav.Link href="/" onClick={handleLogout}>
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
      {/* <Navbar bg="dark" variant="dark" className="mb-5" expand="lg">
        <Container fluid className="navbar-container">
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
    </>
  );
};
