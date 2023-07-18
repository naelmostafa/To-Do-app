import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const Registration = () => {
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [hidden, setHidden] = useState(true);
    const [errMsgName, setErrMsgName] = useState("");
    const [errMsgEmail, setErrMsgEmail] = useState("");
    const [errMsgPassword, setErrMsgPassword] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [error, setError] = useState(false);

    const toggleShow = () => {
        setHidden(!hidden);
    };

    const onChangeHandler = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
        // clear error messages
        setErrMsgName("");
        setErrMsgEmail("");
        setErrMsgPassword("");
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("name", signupData.name);
        formdata.append("email", signupData.email);
        formdata.append("password", signupData.password);

        const requestOptions = {
            method: "POST",
            body: formdata,
        };

        fetch("http://localhost:8000/register", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (!result.errors) {
                    setSignupData({
                        name: "",
                        password: "",
                        email: "",
                    });
                    setErrMsgName("");
                    setErrMsgEmail("");
                    setErrMsgPassword("");
                    setError(false);
                    setSuccessMsg('Registration successful. Please <Link to="/login">login</Link>');
                }
                if (result.errors && result.errors.name) {
                    setError(true);
                    setErrMsgName(result.errors.name[0]);
                }
                if (result.errors && result.errors.email) {
                    setError(true);
                    setErrMsgEmail(result.errors.email[0]);
                }
                if (result.errors && result.errors.password) {
                    setError(true);
                    setErrMsgPassword(result.errors.password[0]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Container fluid="sm">
            <h1 className="text-center">Register</h1>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label className="d-flex justify-content-start">Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={signupData.name}
                        onChange={onChangeHandler}
                    />
                    {errMsgName && (
                        <Alert variant="danger" className="mt-2">
                            {errMsgName}
                        </Alert>
                    )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-start">Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={signupData.email}
                        onChange={onChangeHandler}
                    />
                    {errMsgEmail && (
                        <Alert variant="danger" className="mt-2">
                            {errMsgEmail}
                        </Alert>
                    )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="d-flex justify-content-start">Password</Form.Label>
                    <Form.Control
                        type={hidden ? "password" : "text"}
                        name="password"
                        placeholder="Password"
                        value={signupData.password}
                        onChange={onChangeHandler}
                    />
                    {errMsgPassword && (
                        <Alert variant="danger" className="mt-2">
                            {errMsgPassword}
                        </Alert>
                    )}
                </Form.Group>
                <Form.Group className="d-flex justify-content-start" controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="Show password"
                        onClick={toggleShow}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
                <p className="mt-2">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
                {successMsg && (
                    <Alert variant="success" className="mt-2">
                        {successMsg}
                    </Alert>
                )}
                {error && (
                    <Alert variant="danger" className="mt-2">
                        {errMsgName}
                    </Alert>
                )}
            </Form>
        </Container>
    );
};

export default Registration;
