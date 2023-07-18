import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

const Header = ({ isLoggedIn, onLogout }) => {

    const handleLogout = async () => {
        try {
            const token = sessionStorage.getItem("authToken");
            const headers = new Headers();
            headers.append("Authorization", `Bearer ${token}`);

            const options = {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            };
            console.log(options);
            const response = await fetch("http://localhost:8000/api/logout", options);
            if (response.status === 200) {
                onLogout();
            }
            console.log(response);
            console.log(options);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>Todo App</Navbar.Brand>
                {isLoggedIn && (
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                )}
                {isLoggedIn && (
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className="ml-auto">
                            <Button onClick={handleLogout}>Logout</Button>
                        </Nav>
                    </Navbar.Collapse>
                )}
            </Container>
        </Navbar>
    );
};

export default Header;
