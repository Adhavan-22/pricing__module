import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Make sure to include your global styles

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <h1 className="text-center hero-title mb-5">
        🚖 Welcome to the Ride Fare Pricing Module
      </h1>

      <Row className="mb-5 justify-content-center">
        <Col md={5} className="mb-4">
          <Card className="glass-card h-100 text-center">
            <Card.Body>
              <Card.Title className="mb-3">📅 Create Day-Based Config</Card.Title>
              <Card.Text>
                Set base fare, distance rates, and time/wait charges based on the day of the week.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/create-config')}>
                Create Config
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5} className="mb-4">
          <Card className="glass-card h-100 text-center">
            <Card.Body>
              <Card.Title className="mb-3">🧮 Calculate Ride Fare</Card.Title>
              <Card.Text>
                Input ride details to calculate total fare instantly using current pricing rules.
              </Card.Text>
              <Button variant="success" onClick={() => navigate('/calculate')}>
                Calculate Fare
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="glass-card">
            <h3 className="mb-4">📊 How Pricing Works</h3>
            <ul className="icon-list">
              <li>
                <strong>Distance Base Price (DBP):</strong> e.g. ₹80 up to 3KM (Tue–Thu), ₹90 on Sat–Mon
              </li>
              <li>
                <strong>Distance Additional Price (DAP):</strong> ₹28–30 per KM after DBP
              </li>
              <li>
                <strong>Time Multiplier Factor (TMF):</strong> 1x up to 1 hr, 1.25x after 1 hr, 2.2x after 2 hrs
              </li>
              <li>
                <strong>Waiting Charges (WC):</strong> First 3 minutes free, ₹5 per 3 mins after that
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
