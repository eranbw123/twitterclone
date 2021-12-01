import { React } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

export const MainNavbar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Tweetme</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Tweets</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
