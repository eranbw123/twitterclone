import { React } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

export const MainNavbar = () => {
  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className={"mb-3"}>
        <Container>
          <Navbar.Brand href="/">Tweetme</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Tweets</Nav.Link>
            {localStorage.getItem("token") && (
              <Nav.Link href="/" onClick={handleLogout}>
                Log Out
              </Nav.Link>
            )}
            {!localStorage.getItem("token") && (
              <>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Log In</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
