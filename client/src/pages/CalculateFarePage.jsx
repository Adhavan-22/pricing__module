import React, { useState } from 'react';
import { calculatePrice } from '../services/api';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import '../index.css'; // Ensure global styles are imported

const CalculateFarePage = () => {
  const [formData, setFormData] = useState({
    day: '',
    distanceKM: '',
    duration: '',
    waitingTime: '',
    name: '',
    mobile: '',
  });
  const [price, setPrice] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCalc = async (e) => {
    e.preventDefault();
    setError('');
    setPrice(null);

    const { day, distanceKM, duration, waitingTime } = formData;

    try {
      const res = await calculatePrice({ day, distanceKM, duration, waitingTime });
      if (res.data?.price !== undefined) {
        console.log("Backend response:", res.data);
        setPrice(res.data.price);
      } else {
        setError('Price not returned from server');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error calculating fare');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card className="glass-card w-100" style={{ maxWidth: '800px' }}>
        <h3 className="text-center mb-4">🚗 Ride Fare Calculator</h3>
        <Form onSubmit={handleCalc}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formName">
                <Form.Label>Rider Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formMobile">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formDay">
                <Form.Label>Day</Form.Label>
                <Form.Select name="day" value={formData.day} onChange={handleChange} required>
                  <option value="">Select Day</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formDistance">
                <Form.Label>Distance (KM)</Form.Label>
                <Form.Control
                  type="number"
                  name="distanceKM"
                  value={formData.distanceKM}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formDuration">
                <Form.Label>Duration (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formWaiting">
                <Form.Label>Waiting Time (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  name="waitingTime"
                  value={formData.waitingTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center mt-4">
            <Button variant="primary" type="submit" size="lg">
              Calculate Fare
            </Button>
          </div>
        </Form>

        {price !== null && !isNaN(price) && (
          <Alert variant="success" className="mt-4 text-center">
            <h4>Total Fare for {formData.name}: ₹{Number(price).toFixed(2)}</h4>
            <p><strong>Mobile:</strong> {formData.mobile}</p>
          </Alert>
        )}

        {error && (
          <Alert variant="danger" className="mt-4 text-center">
            {error}
          </Alert>
        )}
      </Card>
    </Container>
  );
};

export default CalculateFarePage;
