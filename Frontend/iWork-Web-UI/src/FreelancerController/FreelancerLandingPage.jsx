import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import WorkCard from "./WorkCard";
import AddPortfolioForm from "./AddPortfolioForm";
import AllPortfolios from "./AllPortfolios";

const FreelancerLandingPage = () => {
  const [activeComponent, setActiveComponent] = useState("workCard");

  const handleButtonClick = (component) => {
    if (component === "back") {
      setActiveComponent("workCard");
    } else {
      setActiveComponent(component);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 style={{ fontWeight: 'bold' }}><u>Welcome Freelancer</u></h2>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <Button
            variant="primary"
            className="me-2"
            onClick={() => handleButtonClick("addNewPortfolio")}
          >
            Add Portfolio
          </Button>
          <Button
            variant="primary"
            className="me-2"
            onClick={() => handleButtonClick("myPortfolios")}
          >
            My Portfolios
          </Button>
          <Button variant="secondary" onClick={() => handleButtonClick("back")}>
            Back
          </Button>
        </Col>
      </Row>
      {/* Render components based on activeComponent state */}
      {activeComponent === "workCard" && <WorkCard />}
      {activeComponent === "addNewPortfolio" && (
        <AddPortfolioForm
          handleButtonClick={() => handleButtonClick("myPortfolios")}
        />
      )}
      {activeComponent === "myPortfolios" && (
        <AllPortfolios />
      )}
    </Container>
  );
};

export default FreelancerLandingPage;