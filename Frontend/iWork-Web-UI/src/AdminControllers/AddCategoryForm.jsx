import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddCategoryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      setError('Both fields are required');
      return;
    }

    axios.post('http://localhost:9091/freelancing/api/Categories/register', formData)
      .then(response => {
        console.log(response.data); // Handle response as needed
        onSubmit(); // Optional: Call the callback function after successful submission
        setFormData({   // Reset the form after submission if needed
          title: '',
          description: ''
        });
        setError('');
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Failed to submit form');
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form.Group controlId="formCategoryTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formCategoryDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddCategoryForm;