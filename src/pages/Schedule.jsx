import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheck } from 'react-icons/fa';
import './ContactPage.css';

const Schedule = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: <FaPhone className="contact-icon" />, title: "Phone", info: "+1 (555) 123-4567" },
    { icon: <FaEnvelope className="contact-icon" />, title: "Email", info: "info@powerhousegym.com" },
    { icon: <FaMapMarkerAlt className="contact-icon" />, title: "Address", info: "123 Fitness St, Gym City" },
    { icon: <FaClock className="contact-icon" />, title: "Hours", info: "Mon-Fri: 5AM-11PM\nSat-Sun: 7AM-9PM" }
  ];

  return (
    <Container fluid className="contact-page px-0"> {/* Remove default padding */}
      {/* Hero Section */}
      <Row className="hero-section mx-0">
        <Col className="text-center py-5 px-3">
          <h1 className="hero-title">GET IN TOUCH</h1>
          <p className="hero-subtitle">Reach out for questions, feedback, or to schedule a tour.</p>
        </Col>
      </Row>

      {/* Contact Cards */}
      <Row className="contact-cards-row mx-0 justify-content-center">
        {contactInfo.map((item, index) => (
          <Col xs={12} sm={6} md={6} lg={3} key={index} className="mb-4 px-3">
            <Card className="contact-card h-100">
              <Card.Body className="text-center">
                <div className="icon-wrapper">{item.icon}</div>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className="text-muted">
                  {item.info.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Contact Form */}
      <Row className="form-row mx-0 justify-content-center">
        <Col xs={12} md={10} lg={8} xl={6} className="px-3">
          <Card className="form-card">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">SEND US A MESSAGE</h2>
              
              {submitted ? (
                <Alert variant="success" className="text-center p-4">
                  <FaCheck className="mb-3" style={{ fontSize: '3rem', color: '#28a745' }} />
                  <h3>Thank You!</h3>
                  <p>We'll get back to you within 24 hours.</p>
                  <Button variant="danger" onClick={() => setSubmitted(false)} className="mt-3">
                    Send Another Message
                  </Button>
                </Alert>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Your Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </Form.Group>

                  <div className="text-center">
                    <Button variant="danger" type="submit" className="submit-btn py-3 px-5">
                      <FaPaperPlane className="me-2" /> Send Message
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Google Map */}
      <Row className="map-row mx-0">
        <Col className="px-0">
          <div className="map-container">
            <iframe
              title="Gym Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7601.010861384702!2d83.31003719107737!3d17.72080863289718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a394332055898a9%3A0xd295c68e3f3f3658!2sVarun%20Fitness!5e0!3m2!1sen!2sin!4v1748602591292!5m2!1sen!2sin" 
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Schedule;