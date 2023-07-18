import React, { useEffect, useState } from "react";
import { Container, Alert } from "react-bootstrap";
import TaskList from "./TaskList.componet";
import TaskForm from "./TaskForm.component";
import EditTask from "./EditTask.component";


const API_ENDPOINTS = {
    // Define your API endpoints here
    'GET_TASKS': 'http://localhost:8000/api/Tasks',
    'ADD_TASK': 'http://localhost:8000/api/Tasks',
    'UPDATE_TASK': 'http://localhost:8000/api/Tasks',
    'DELETE_TASK': 'http://localhost:8000/api/Tasks',
};

const TaskManager = ({ isLoggedIn }) => {
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        status: "",
    });
    const [successAlertMsg, setSuccessAlertMsg] = useState("");
    const [taskDeleteMsg, setTaskDeleteMsg] = useState("");
    const [editTaskDataModal, setEditTaskDataModal] = useState(false);
    const [editTaskData, setEditTaskData] = useState({
        title: "",
        description: "",
    });
    const [successTaskUpdatedMsg, setSuccessTaskUpdatedMsg] = useState("");

    const onChangehandler = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value });
    };

    const handleDelete = async (id) => {
        try {
            // Add your logic to delete a task
            fetch(`${API_ENDPOINTS.DELETE_TASK}/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
                },
            })
                .then((response) => response.json())
                .then((result) => {
                    if (!result.errors) {
                        setTaskDeleteMsg("Task deleted successfully.");
                        window.location.reload();
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    const toggleEditTaskModal = () => {
        setEditTaskDataModal(!editTaskDataModal);
    };

    const onChangeEditTaskHandler = (e) => {
        setEditTaskData({ ...editTaskData, [e.target.name]: e.target.value });
    };

    const editTask = (id, title, description) => {
        setEditTaskData({ id, title, description });
        setEditTaskDataModal(!editTaskDataModal);
    };

    const updateTask = async () => {
        try {
            // Add your logic to update a task
            const formData = new FormData();
            formData.append("title", editTaskData.title);
            formData.append("description", editTaskData.description);
            formData.append("status", 'pending');
            const requestOptions = {
                method: "PUT",
                body: formData,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
                },
            };
            console.log(requestOptions);
            fetch(`${API_ENDPOINTS.UPDATE_TASK}/${editTaskData.id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (!result.errors) {
                        setSuccessTaskUpdatedMsg("Task updated successfully.");
                        window.location.reload();
                    }
                });
        } catch (error) {
            console.log("error", error);
        }
    };

    if (!isLoggedIn) {
        return <p>Please login to view the content.</p>;
    }

    return (
        <Container className="mt-5">
            <TaskForm isLoggedIn={isLoggedIn} />

            <div className="text-success p-4 mt-2">{successAlertMsg}</div>

            {/* TODO list */}
            <TaskList
                editTask={editTask}
                handleDelete={handleDelete}
                taskDeleteMsg={taskDeleteMsg}
            />

            {/* Model for Edit Task */}
            <EditTask
                toggleEditTaskModal={toggleEditTaskModal}
                editTaskDataModal={editTaskDataModal}
                onChangeEditTaskHandler={onChangeEditTaskHandler}
                editTask={editTask}
                editTaskData={editTaskData}
                successTaskUpdatedMsg={successTaskUpdatedMsg}
                updateTask={updateTask}
            />
        </Container>
    );
};

export default TaskManager;
