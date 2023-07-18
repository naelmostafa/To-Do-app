import React, { useEffect, useState } from "react";
import { Button, ListGroup, Alert } from "react-bootstrap";
import Task from "./Task.component";

const TaskList = ({
    handleDelete,
    taskDeleteMsg,
    editTask,
}) => {
    const [showTaskData, setShowTaskData] = useState([]);

    useEffect(() => {
        getTaskData();
    }, []);

    const getTaskData = () => {
        try {
            fetch("http://localhost:8000/api/Tasks", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
                },
            })
                .then((response) => response.json())
                .then((result) => {

                    setShowTaskData(result.tasks);

                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const clearList = () => {
        setShowTaskData([]);
    };

    return (
        <ListGroup className="my-2">
            <h3 className="text-capitalize">Task List</h3>
            {showTaskData.length > 0 ? (
                showTaskData.map((task) => (
                    <Task
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        handleDelete={() => handleDelete(task.id)}
                        editTask={() => editTask(task.id, task.title, task.description)}
                    />
                ))
            ) : (
                <p>No tasks found.</p>
            )}
            <Button variant="danger" onClick={clearList}>
                Clear all
            </Button>
            {taskDeleteMsg && <Alert variant="danger">{taskDeleteMsg}</Alert>}
        </ListGroup>
    );
};

export default TaskList;
