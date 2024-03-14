import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

const EditForm = ({ portfolio, handleClose }) => {
    const [formData, setFormData] = useState({
        title: portfolio.title,
        description: portfolio.description,
        image: portfolio.image,
        hourlyCharges: portfolio.hourlyCharges,
        status: portfolio.status,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:9091/freelancing/api/Portfolio/updateportfolioById/${portfolio.id}`, formData);
            handleClose(); // Close the modal after successful submission
            // Optionally, update the state to reflect the changes without a page refresh
        } catch (error) {
            console.error('Error updating portfolio:', error);
        }
    };

    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Portfolio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" name="image" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="hourlyCharges">
                        <Form.Label>Hourly Charges</Form.Label>
                        <Form.Control type="text" name="hourlyCharges" value={formData.hourlyCharges} onChange={handleChange} pattern="^(?!-)(?!0)\d{3,}$"
                            title="value not allowed" required />
                    </Form.Group>

                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={handleClose} className="ms-2">
                        Close
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditForm;