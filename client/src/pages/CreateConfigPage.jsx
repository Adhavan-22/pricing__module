import React, { useState } from 'react';
import { createConfig } from '../services/api';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import '../index.css'; // Or wherever your global styles are

const CreateConfigPage = () => {
  const [formData, setFormData] = useState({
    day: '',
    basePrice: '',
    additionalPrice: '',
    timeMultiplier: '',
    waitingCharge: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      await createConfig(formData);
      setSuccess('Day-based config created successfully');
      setFormData({
        day: '',
        basePrice: '',
        additionalPrice: '',
        timeMultiplier: '',
        waitingCharge: ''
      });
    } catch (err) {
      console.error('Create config error:', err);
      setError(err.response?.data?.error || 'Error creating config');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card className="glass-card w-100" style={{ maxWidth: '800px' }}>
        <h3 className="text-center mb-4">🛠️ Create Day-Based Pricing Config</h3>
        <Form onSubmit={handleSubmit}>
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
              <Form.Group controlId="formBasePrice">
                <Form.Label>Base Price (INR)</Form.Label>
                <Form.Control
                  type="number"
                  name="basePrice"
                  value={formData.basePrice}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formAdditionalPrice">
                <Form.Label>Additional Price per KM (INR)</Form.Label>
                <Form.Control
                  type="number"
                  name="additionalPrice"
                  value={formData.additionalPrice}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formTimeMultiplier">
                <Form.Label>Time Multiplier Factor</Form.Label>
                <Form.Control
                  type="number"
                  name="timeMultiplier"
                  value={formData.timeMultiplier}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="formWaitingCharge">
                <Form.Label>Waiting Charge (INR per 3 min)</Form.Label>
                <Form.Control
                  type="number"
                  name="waitingCharge"
                  value={formData.waitingCharge}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center">
            <Button type="submit" variant="success" size="lg">Submit Config</Button>
          </div>
        </Form>

        {success && <Alert variant="success" className="mt-4">{success}</Alert>}
        {error && <Alert variant="danger" className="mt-4">{error}</Alert>}
      </Card>
    </Container>
  );
};

export default CreateConfigPage;
