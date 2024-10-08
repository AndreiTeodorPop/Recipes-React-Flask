import React, {useState} from 'react';
import {Button, Card, Modal} from "react-bootstrap";


const Recipe = ({title, description, onClick, onDelete}) => {

    const [showModal, setShowModal] = useState(false);

    return (<Card className="recipe">
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <p>{description}</p>
            <Button variant="primary" onClick={onClick}>Edit</Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="danger" onClick={() => setShowModal(true)}>Delete</Button>
            <Modal show={showModal} dialogClassName="my-modal" onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete this recipe?</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <Button variant="danger" onClick={onDelete}>Yes, delete</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button className="cancel-button" variant="primary" onClick={() => setShowModal(false)}>Cancel</Button>
                </Modal.Body>
            </Modal>
        </Card.Body>
    </Card>)
}

export default Recipe;