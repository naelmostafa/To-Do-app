import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";

const TaskForm = ({ isLoggedIn }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  const [errMsgTitle, setErrMsgTitle] = useState("");
  const [errMsgDescription, setErrMsgDescription] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState(false);



  const onChangeHandler = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
    // clear error messages
    setErrMsgTitle("");
    setErrMsgDescription("");
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (taskData.title.trim() === "" || taskData.description.trim() === "") {
      return;
    }
    const formdata = new FormData();
    formdata.append("title", taskData.title);
    formdata.append("description", taskData.description);

    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const requestOptions = {
      method: "POST",
      body: formdata,
      headers: header,
    };

    fetch("http://localhost:8000/api/Tasks", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (!result.errors) {
          setTaskData({
            title: "",
            description: "",
          });
          setErrMsgTitle("");
          setErrMsgDescription("");
          setError(false);
          setSuccessMsg("Task added successfully.");
        }
        if (result.errors && result.errors.title) {
          setError(true);
          setErrMsgTitle(result.errors.title[0]);
        }
        if (result.errors && result.errors.description) {
          setError(true);
          setErrMsgDescription(result.errors.description[0]);
        }
      }).catch((error) => {
        setError(true);
        console.log(error);
      });
    setTaskData({ title: "", description: "" });
  };

  if (!isLoggedIn) {
    return <p>Please log in to add tasks.</p>;
  }

  return (
    <Container fluid="sm">
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label className="d-flex justify-content-start">Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={taskData.title}
            onChange={onChangeHandler}
            placeholder="Enter title"
          />
          {errMsgTitle && (
            <Alert variant="danger" className="mt-2">
              {errMsgTitle}
            </Alert>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label className="d-flex justify-content-start">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={taskData.description}
            onChange={onChangeHandler}
            placeholder="Enter description"
          />
          {errMsgDescription && (
            <Alert variant="danger" className="mt-2">
              {errMsgDescription}
            </Alert>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Task
        </Button>
        {successMsg && (
          <Alert variant="success" className="mt-2">
            {successMsg}
          </Alert>
        )}
        {error && (
          <Alert variant="danger" className="mt-2">
            Error adding task.
          </Alert>
        )}
      </Form>
    </Container>
  );
};

export default TaskForm;
