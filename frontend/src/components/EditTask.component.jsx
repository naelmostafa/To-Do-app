import React from "react";
import { Modal, Button } from "react-bootstrap";

const EditTask = (props) => {
    const handleClose = () => {
        props.toggleEditTaskModal();
    };

    const handleUpdate = () => {
        props.updateTask();
    };

    return (
        <Modal show={props.editTaskDataModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="input-field-container">
                    <input
                        autoFocus
                        type="text"
                        name="title"
                        placeholder="Task Title"
                        value={props.editTaskData.title}
                        onChange={props.onChangeEditTaskHandler}
                        className="task-title form-control"
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Task description"
                        value={props.editTaskData.description}
                        onChange={props.onChangeEditTaskHandler}
                        className="form-control mt-3"
                    />
                </div>
                {props.successTaskUpdatedMsg && (
                    <div className="text-success p-4 mt-2">
                        {props.successTaskUpdatedMsg}
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="success" onClick={handleUpdate}>
                    UPDATE
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditTask;
