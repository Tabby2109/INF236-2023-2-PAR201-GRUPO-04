import React, { useState } from 'react';
    import { Modal, Button, Form } from 'react-bootstrap';

    const EventModal = ({ show, handleClose, handleSave }) => {
      const [eventText, setEventText] = useState('');
      const [eventType, setEventType] = useState('');

      const handleInputChange = (e) => {
        setEventText(e.target.value);
      };

      const handleSelectChange = (e) => {
        setEventType(e.target.value);
      };

      const handleSubmit = () => {
        handleSave(eventText, eventType);
        handleClose();
      };

      return (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="eventText">
                <Form.Label>Event Text</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} />
              </Form.Group>
              <Form.Group controlId="eventType">
                <Form.Label>Event Type</Form.Label>
                <Form.Control as="select" onChange={handleSelectChange}>
                  <option>Type 1</option>
                  <option>Type 2</option>
                  <option>Type 3</option>
                  <option>Type 4</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      );
    };

    export default EventModal;