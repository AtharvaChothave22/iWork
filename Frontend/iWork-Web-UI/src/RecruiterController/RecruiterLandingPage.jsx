import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import FreelancerCard from "../FreelancerController/FreelancerCard";
import axios from "axios";

const RecruiterLandingPage = () => {
  const navigate = useNavigate();
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9091/freelancing/api/Portfolio/allPortfolio")
      .then((response) => {
        setFreelancers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h2" gutterBottom style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
        Welcome Recruiter
      </Typography>

      <div style={{ marginBottom: "20px" }}>
        <Button
          variant="contained"
          className="btn btn-primary"
          onClick={() => navigate("/add-work")}
          style={{ marginRight: "10px" }}
        >
          Add Work
        </Button>
        <Button
          style={{ marginRight: "10px", backgroundColor: "rgb(60 60 60)" }}
          variant="contained"
          onClick={() => navigate("/my-posts")}
        >
          Self Posts
        </Button>
      </div>

      <div className="freelancer-list">
        {/* Displaying freelancer cards */}
        <div className="freelancer-cards-container">
          {freelancers.map((freelancer, index) => (
            <FreelancerCard
              key={index}
              id={freelancer.id}
              title={freelancer.title}
              description={freelancer.description}
              image={freelancer.image}
              hourlyCharges={freelancer.hourlyCharges}
              skill={freelancer.category.title}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default RecruiterLandingPage;
