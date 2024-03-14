import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import "./freelancerCards.css";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import defaultUser from "../assests/dummyUser.png";


const ShinyTag = ({ skill }) => {
  return (
    <div className="shiny-tag" style={{ backgroundColor: '#000000' }}>
      <span>{skill}</span>
    </div>
  );
};

const FreelancerCard = ({
  id,
  title,
  description,
  image,
  hourlyCharges,
  skill,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [contactDetails, setContactDetails] = useState(null);
  const [showMore, setShowMore] = useState(false); // Define showMore state variable


  const fetchContactDetails = (id) => {
    axios
      .get(`http://localhost:9091/freelancing/api/Portfolio/user/${id}`)
      .then((response) => {
        setContactDetails(response.data);
        setShowModal(true);
      })
      .catch((error) => {
        console.log("Error fetching contact details:", error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleImageError = (event) => {
    event.target.src = defaultUser;
  };

  return (
    <div className="freelancer-card">
      <img
        src={image}
        alt={title}
        className="card-image"
        onError={handleImageError}
      />
      <div className="card-content">
        <h2 className="card-title" style={{ height: '100px' }}>{title}</h2>
        {/* <p className="card-description">{description}</p> */}
        <p className="card-text">
          {description.length > 200 ? (
            <>
              {showMore ? description : description.slice(0, 200) + '... '}
              <button className="btn btn-link" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Read Less' : 'Read More'}
              </button>
            </>
          ) : description}
        </p>
        {/* <p className="card-hourly-charges">${hourlyCharges}/hour</p> */}
        <p className="card-text" style={{ backgroundColor: 'rgb(255 181 181)', width: 'max-content', padding: '3px', fontWeight: 'bold', borderRadius: '5px' }}>{hourlyCharges} ₹/hr</p>
        <div className="card-skills" style={{ marginLeft: '20%' }}>
          <ShinyTag skill={skill} />
        </div>
        <div className="card-buttons">
          <button
            className="btn btn-info"
            onClick={() => fetchContactDetails(id)}
          >
            Contact
          </button>
        </div>
      </div>
      <Modal open={showModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white", // Use backgroundColor instead of bgcolor
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="div" gutterBottom style={{ textDecoration: 'underline' }}>
            Contact Details
          </Typography>
          {contactDetails && (
            <div>
              <p><b>Name: </b> {contactDetails.name}</p>
              <p><b>Email: </b> {contactDetails.email}</p>
              {/* <p>Mobile Number: {contactDetails.mobileNumber}</p> */}
            </div>
          )}
          <Button className='btn btn-primary' onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
    </div >
  );
};

export default FreelancerCard;
