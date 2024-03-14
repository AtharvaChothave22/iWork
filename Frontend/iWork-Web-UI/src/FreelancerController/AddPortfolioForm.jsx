import React, { useState, useEffect } from "react";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebase/firebase";
import { useSelector } from "react-redux";
const AddPortfolioForm = ({ handleButtonClick }) => {
  const [categories, setCategories] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    hourlyCharges: "",
    categoryId: "",
    status: true,
  });

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = {
        title: formData.title,
        description: formData.description,
        hourlyCharges: formData.hourlyCharges,
        status: formData.status,
        image: null, // Initialize as null for now
      };

      // Handle image upload to Firebase Storage
      const metadata = {
        contentType: formData.image.type,
      };
      const storageRef = ref(
        storage,
        `portfolio_images/${Date.now()}_${formData.image.name}`
      );
      const uploadTask = uploadBytesResumable(
        storageRef,
        formData.image,
        metadata
      );
      await uploadTask;
      const downloadURL = await getDownloadURL(storageRef);

      // Update the formDataToSend with the image URL
      formDataToSend.image = downloadURL;

      // Send the form data to the backend
      await axios.post(
        `http://localhost:9091/freelancing/api/Portfolio/createportfolio/${userId}/category/${formData.categoryId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json", // Set content type as application/json
          },
        }
      );

      // Reset the form data after submission
      setFormData({
        title: "",
        description: "",
        image: null,
        hourlyCharges: "",
        categoryId: "",
        status: true,
      });

      handleButtonClick();
    } catch (error) {
      console.error("Error adding portfolio:", error);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleClose = () => {
    handleBack();
    setFormData({
      title: "",
      description: "",
      image: null,
      hourlyCharges: "",
      categoryId: "",
      status: true,
    });
  };

  return (
    <div className="add-portfolio-form">
      <h3>Add Portfolio</h3>
      <form onSubmit={handleSubmit}>
        <table className="table">
          <tbody>
            <tr>
              <td>Title</td>
              <td>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Description</td>
              <td>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </td>
            </tr>
            <tr>
              <td>Image</td>
              <td>
                <input type="file" name="image" onChange={handleImageChange} />
              </td>
            </tr>
            <tr>
              <td>Hourly Charges</td>
              <td>
                <input
                  type="text"
                  name="hourlyCharges"
                  value={formData.hourlyCharges}
                  onChange={handleChange}
                  pattern="^(?!-)(?!0)\d{3,}$"
                  title="value not allowed"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Category</td>
              <td>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="form-group">
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </div>
      </form>
      <br /><br /><br />
    </div>
  );
};

export default AddPortfolioForm;
