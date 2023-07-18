import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState(false);

  const onChangeHandler = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("email", loginData.email);
    formdata.append("password", loginData.password);

    const requestOptions = {
      method: "POST",
      body: formdata,

    };

    fetch("http://localhost:8000/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log('token', result.token);
        if (!result.errors) {
          setLoginData({ email: "", password: "" });
          setErrMsg("");
          setError(false);
          sessionStorage.setItem("authToken", result.token);
          setSuccessMsg("Login successful");
          onLogin()
        }
        if (result.errors) {
          setError(true);
          setErrMsg(result.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container fluid="sm">
      <h1 className="text-center">Login</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="d-flex justify-content-start">
            Email address
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={loginData.email}
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="d-flex justify-content-start">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <p className="mt-2">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        {successMsg && (
          <Alert variant="success" className="mt-2">
            {successMsg}
          </Alert>
        )}
        {error && (
          <Alert variant="danger" className="mt-2">
            {errMsg}
          </Alert>
        )}
      </Form>
    </Container>
  );
};

export default Login;
