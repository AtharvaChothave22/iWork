import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PortfolioForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    hourlyCharges: '',
    category: ''
  });

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:9091/freelancing/api/Categories/allCategories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchUserId = () => {
      // Assuming you have some way to retrieve the user ID from local session
      // This can be adjusted based on how you handle user authentication
      const userIdFromSession = sessionStorage.getItem('userId');
      if (userIdFromSession) {
        setUserId(userIdFromSession);
      } else {
        console.error('User ID not found in session.');
      }
    };

    fetchCategories();
    fetchUserId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:9091/freelancing/api/Portfolio/createportfolio/${userId}/category/${selectedCategoryId}`;
      const response = await axios.post(url, formData);
      console.log('Portfolio registered successfully:', response.data);
      // You can handle success here, e.g., show a success message, redirect, etc.
    } catch (error) {
      console.error('Error registering portfolio:', error);
      // You can handle errors here, e.g., show an error message to the user
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register Portfolio</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input type="text" className="form-control" id="image" name="image" value={formData.image} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="hourlyCharges" className="form-label">Hourly Charges</label>
          <input type="text" className="form-control" id="hourlyCharges" name="hourlyCharges" value={formData.hourlyCharges} onChange={handleChange} pattern="^(?!-)\d+(\.\d+)?$" required title="negative value not allowed" />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select className="form-select" id="category" name="category" value={selectedCategoryId} onChange={handleCategoryChange}>
            <option value="">Select a Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.title}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default PortfolioForm;
