import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Autocomplete,
  Button,
  Container,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

const PostForm = () => {
  const userId = useSelector((store) => store.auth.userId);
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
  }, []);

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

        const response = await axios
          .post(
            `http://localhost:9091/freelancing/api/createpost/${userId}/category/${formData.category.id}`,
            {
              title: formData.title,
              description: formData.description,
              image: downloadURL,
              budget: formData.budget,
              status: "true",
            }
          )
          .then(() => {
            navigate("/my-posts");
          });
        console.log(response.data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Create a New Post
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
      <br />
    </ThemeProvider>
  );
};

export default PostForm;
