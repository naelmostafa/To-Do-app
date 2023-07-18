import React from "react";
import { ListGroup, Button } from "react-bootstrap";

const Task = ({ title, description, handleDelete, editTask }) => {
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <div>
                <b>{title}</b>
                <p>{description}</p>
            </div>
            <div>
                <Button variant="success" className="mx-2" onClick={editTask}>
                    Edit
                </Button>
                <Button variant="danger" className="mx-2" onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </ListGroup.Item>
    );
};

export default Task;