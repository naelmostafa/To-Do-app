import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";

const TaskForm = ({ isLoggedIn }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "todo",
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

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(taskData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    };

    fetch("http://localhost:8000/api/Tasks", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (!result.errors) {
          setTaskData({
            title: "",
            description: "",
            status: "todo",
          });
          setErrMsgTitle("");
          setErrMsgDescription("");
          setError(false);
          window.location.reload();
          setSuccessMsg("Task added successfully.");
        }
        setError(true);
        if (result.errors && result.errors.title) {
          setErrMsgTitle(result.errors.title[0]);
        }
        if (result.errors && result.errors.description) {
          setErrMsgDescription(result.errors.description[0]);
        }
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  if (!isLoggedIn) {
    return <p>Please log in to add tasks.</p>;
  }

  return (
    <Container fluid="sm">
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
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
          <Form.Label>Description</Form.Label>
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
        <Form.Group className="mb-3" controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={taskData.status}
            onChange={onChangeHandler}
          >
            <option value="todo">New</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Completed</option>
          </Form.Control>
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
