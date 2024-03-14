import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase/firebase";
import base from '../../assests/dummyUser.png'
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";

const MyProfile = () => {
  const [editMode, setEditMode] = useState(false);
  // const [error, setError] = useState("");
  const userId = useSelector((store) => store.auth.userId);
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    city: "",
    country: "India", // Default country is set to India
    image: "",
    about: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [cities, setCities] = useState([]); // State to store list of cities

  useEffect(() => {
    axios
      .get(`http://localhost:9091/freelancing/api/users/userById/${userId}`)
      .then((res) => {
        setUser(res.data);
        setImagePreview(res.data.image);
        // Fetch list of cities based on the default country (India)
        fetchCities("India");
      });
  }, [userId]);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setImage(file);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    ////
    // // Validate mobileNumber using regex (allowing only digits and optional +91 at the beginning)
    // if (name === "mobileNumber" && !/^\+?91?\d{10}$/.test(value)) {
    //   setError("Invalid mobile number. Please enter a valid 10-digit mobile number.");
    //   return;
    // }
    ////
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    // If the country changes, fetch cities based on the new country
    if (name === "country") {
      fetchCities(value);
    }
  };

  const renderProfileField = (label, value, id) => {
    const editableFields = ['name', 'city', 'country', 'about'];

    return (
      <div key={id} style={{ marginBottom: "16px" }}>
        <Typography variant="h6" gutterBottom>
          {label}:
        </Typography>
        {editMode && editableFields.includes(id) ? (
          <TextField
            id={id}
            fullWidth
            variant="outlined"
            name={id}
            value={user[id] || ""}
            label={`Enter ${label.toLowerCase()}`}
            onChange={handleInputChange}
            // For country field, provide a select dropdown
            select={id === "country"}
          >
            {id === "country" ? (
              // Options for country dropdown
              ["India"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))
            ) : null}
          </TextField>
        ) : (
          <Typography variant="body1">{value || "N/A"}</Typography>
        )
        }
      </div >
    );
  };

  const fetchCities = (country) => {
    let data = ["Pune", "Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai", "Nagpur"];
    setCities(data);
  };
  // const fetchCities = (country) => {
  //   // Example of fetching cities based on country (you may need to implement this)
  //   // Here, assuming cities are fetched from an API
  //   axios
  //     .get(http://localhost:9091/freelancing/api/cities/${country})
  //     .then((res) => {
  //       setCities(res.data.slice(0, 10)); // Selecting first 10 cities
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching cities:", error);
  //     });
  // };

  const handleSaveChanges = async () => {
    try {
      if (image) {
        const metadata = {
          contentType: image.type,
        };
        const storageRef = ref(
          storage,
          `images/${userId}_${Date.now()}_${image.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, image, metadata);
        await uploadTask;
        const downloadURL = await getDownloadURL(storageRef);

        await axios.put(
          `http://localhost:9091/freelancing/api/users/updateUserById/${userId}`,
          {
            ...user,
            image: downloadURL,
          }
        );
      }

      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Container>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
      >
        {editMode ? (
          <Avatar sx={{ width: 120, height: 120, marginRight: "16px" }}>
            <input
              type="file"
              onChange={handleImageChange}
              style={{ width: "100%", height: "100%", opacity: 0 }}
            />
          </Avatar>
        ) : (
          <Avatar
            alt="User Avatar"
            src={
              imagePreview ||
              base
            }
            sx={{ width: 120, height: 120, marginRight: "16px" }}
          />
        )}
        <div>
          <Typography variant="h4" gutterBottom>
            {user.name}
          </Typography>
          {editMode && (
            <Typography variant="body2" gutterBottom>
              Upload a different photo...
            </Typography>
          )}
        </div>
      </div>

      <div>
        {renderProfileField("Name", user.name, "name")}
        {renderProfileField("Email", user.email, "email")}
        {renderProfileField("Mobile Number", user.mobileNumber, "mobileNumber")}
        {editMode && (
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-multiple-chip-label">City</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip-label"
                name="city"
                input={<OutlinedInput id="select-multiple-chip" label="City" />}
                style={{ minWidth: 120 }}
                label="City"
                value={user.city}
                onChange={handleInputChange}
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        {renderProfileField("Country", user.country, "country")}
        {renderProfileField("About", user.about, "about")}
      </div>

      <div style={{ marginTop: "16px" }}>
        {editMode ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={handleEditClick}
            startIcon={<EditIcon />}
          >
            Edit Profile
          </Button>
        )}
      </div>
    </Container>
  );
};
export default MyProfile;