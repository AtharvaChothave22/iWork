import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAllCategory = () => {
    const [categories, setCategories] = useState([]);
    const [editData, setEditData] = useState({
        id: null,
        title: '',
        description: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:9091/freelancing/api/Categories/allCategories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleEdit = (category) => {
        setEditData({ id: category.id, title: category.title, description: category.description });
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:9091/freelancing/api/Categories/updateCategoryById/${editData.id}`, {
                title: editData.title,
                description: editData.description
            });
            setIsEditing(false);
            fetchCategories(); // Refresh data after edit
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this category?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:9091/freelancing/api/Categories/deleteById/${id}`);
                fetchCategories(); // Refresh data after deletion
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>All Categories</h2>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={editData.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            value={editData.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mr-2">Save</button>
                    <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.title}</td>
                                <td>{category.description}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm mr-2"
                                        onClick={() => handleEdit(category)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(category.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewAllCategory;