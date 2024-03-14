import React, { useState, useEffect } from "react";

import {
  Autocomplete,
  Button,
  Container,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebase/firebase";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { useSelector } from "react-redux";

const EditPostForm = () => {
  const userId = useSelector((store) => store.auth.userId);

  const { postId } = useParams();
  const navigate = useNavigate();

  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#000000", // black color
      },
    },
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    budget: "",
    status: true,
    category: null,
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchPostData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9091/freelancing/api/Categories/allCategories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchPostData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9091/freelancing/api/getPostById/${postId}`
      );

      const post = response.data;
      setFormData({
        title: post.title,
        description: post.description,
        image: null, // You may need to handle images differently here
        budget: post.budget,
        status: post.status,
        category: post.category,
      });
      console.log(formData);
      // You may want to set the image preview here if necessary
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  const handleCategoryChange = (event, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      category: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    // Validation logic similar to the PostForm component
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.budget.trim()) {
      newErrors.budget = "Budget is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (!formData.image) {
      newErrors.image = "Image is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // Handle image upload and storage logic similar to the PostForm component
        const metadata = {
          contentType: formData.image.type, // Set accurate content type
        };
        const storageRef = ref(
          storage,
          `images/${userId}_${Date.now()}_${formData.image.name}`
        );
        const uploadTask = uploadBytesResumable(
          storageRef,
          formData.image,
          metadata
        );
        await uploadTask;
        const downloadURL = await getDownloadURL(storageRef);
        console.log(downloadURL);

        // Construct the payload for the update
        const payload = {
          title: formData.title,
          description: formData.description,
          imagePath: downloadURL, // Update this based on your logic
          budget: formData.budget,
          status: formData.status,
        };

        // Send the update request to the backend
        const response = await axios.put(
          `http://localhost:9091/freelancing/api/updatePost/${postId}`,
          payload
        );

        console.log(response.data);

        // Redirect to the desired page after updating
        navigate("/my-posts");
      } catch (error) {
        console.error("Error updating post:", error);
      }
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Edit Post
        </Typography>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              placeholder="Enter a title"
            />
            <div className="invalid-feedback">{errors.title}</div>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`form-control ${errors.description ? "is-invalid" : ""
                }`}
              placeholder="Enter a description"
            />
            <div className="invalid-feedback">{errors.description}</div>
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className={`form-control ${errors.image ? "is-invalid" : ""}`}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="mt-2 img-thumbnail"
              />
            )}
            <div className="invalid-feedback">{errors.image}</div>
          </div>

          <div className="mb-3">
            <label htmlFor="budget" className="form-label">
              Budget:
            </label>
            <input
              type="text"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              pattern="^(?!-)(?!0)\d{3,}$"
              required
              title="value not allowed"
              className={`form-control ${errors.budget ? "is-invalid" : ""}`}
              placeholder="Enter the budget"
            />
            <div className="invalid-feedback">{errors.budget}</div>
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category:
            </label>
            <Autocomplete
              id="category"
              options={categories}
              getOptionLabel={(option) => option.title}
              value={formData.category}
              onChange={handleCategoryChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors.category}
                  helperText={errors.category}
                  placeholder="Select a category"
                />
              )}
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              id="status"
              name="status"
              checked={formData.status}
              onChange={handleChange}
              className="form-check-input"
            />
            <label htmlFor="status" className="form-check-label">
              Status
            </label>
          </div>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};
export default EditPostForm;
