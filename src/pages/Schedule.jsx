import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheck, FaInstagram, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './ContactPage.css';

const Schedule = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would typically send the data to your backend
  };

  const contactInfo = [
    { icon: <FaPhone className="contact-icon" />, title: "Phone", info: "+1 (555) 123-4567", link: "tel:+15551234567" },
    { icon: <FaEnvelope className="contact-icon" />, title: "Email", info: "info@fitnessguru.com", link: "mailto:info@fitnessguru.com" },
    { icon: <FaMapMarkerAlt className="contact-icon" />, title: "Address", info: "123 Fitness Avenue\nGym City, GC 12345" },
    { icon: <FaClock className="contact-icon" />, title: "Hours", info: "Mon-Fri: 5AM-11PM\nSat-Sun: 7AM-9PM" }
  ];

  const socialMedia = [
    { icon: <FaInstagram />, name: "Instagram", url: "#" },
    { icon: <FaFacebook />, name: "Facebook", url: "#" },
    { icon: <FaTwitter />, name: "Twitter", url: "#" },
    { icon: <FaYoutube />, name: "YouTube", url: "#" }
  ];

  const testimonials = [
    {
      quote: "The trainers at Fitness Guru transformed my life! Their personalized approach helped me achieve my fitness goals faster than I ever imagined.",
      author: "Sarah Johnson",
      role: "Member since 2020"
    },
    {
      quote: "I've tried many gyms before, but none compare to the community and expertise at Fitness Guru. The facilities are top-notch!",
      author: "Michael Chen",
      role: "Member since 2019"
    },
    {
      quote: "The nutrition counseling combined with their workout programs gave me results I couldn't get anywhere else. Highly recommend!",
      author: "Emily Rodriguez",
      role: "Member since 2021"
    }
  ];

  return (
    <Container fluid className="contact-page px-0">
      {/* Hero Section with Parallax Effect */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero-section mx-0"
      >
        <div className="hero-overlay"></div>
        <Col className="text-center py-5 px-3 hero-content">
          <h1 className="hero-title">CONNECT WITH FITNESS GURU</h1>
          <p className="hero-subtitle">Your journey to better health starts with a conversation</p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4"
          >
            <Button variant="outline-light" size="lg" href="#contact-form">
              Get in Touch <FaPaperPlane className="ms-2" />
            </Button>
          </motion.div>
        </Col>
      </motion.div>

      {/* Why Choose Us Section */}
      <Row className="why-choose-us mx-0 py-5">
        <Col className="text-center mb-5">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-title"
          >
            WHY CHOOSE FITNESS GURU
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="title-underline"
          ></motion.div>
        </Col>
        
        <Col xs={12} md={10} lg={8} className="mx-auto">
          <Row className="g-4">
            <Col xs={12} md={4}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="feature-card p-4 text-center"
              >
                <div className="feature-icon mb-3">
                  <i className="fas fa-dumbbell"></i>
                </div>
                <h4>Expert Trainers</h4>
                <p>Certified professionals with years of experience in transforming bodies and lives.</p>
              </motion.div>
            </Col>
            <Col xs={12} md={4}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="feature-card p-4 text-center"
              >
                <div className="feature-icon mb-3">
                  <i className="fas fa-heartbeat"></i>
                </div>
                <h4>Personalized Plans</h4>
                <p>Custom workout and nutrition plans tailored to your specific goals and needs.</p>
              </motion.div>
            </Col>
            <Col xs={12} md={4}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="feature-card p-4 text-center"
              >
                <div className="feature-icon mb-3">
                  <i className="fas fa-users"></i>
                </div>
                <h4>Supportive Community</h4>
                <p>Join a network of like-minded individuals all working toward better health.</p>
              </motion.div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Contact Cards with Staggered Animation */}
      <Row className="contact-cards-row mx-0 justify-content-center py-5">
        {contactInfo.map((item, index) => (
          <Col xs={12} sm={6} md={6} lg={3} key={index} className="mb-4 px-3">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="contact-card h-100">
                <Card.Body className="text-center">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="icon-wrapper"
                  >
                    {item.icon}
                  </motion.div>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text className="text-muted">
                    {item.info.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </Card.Text>
                  {item.link && (
                    <Button variant="link" href={item.link} className="contact-link">
                      Contact via {item.title}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Testimonials Section */}
      <Row className="testimonials-row mx-0 py-5">
        <Col className="text-center mb-5">
          <h2 className="section-title">WHAT OUR MEMBERS SAY</h2>
          <div className="title-underline"></div>
        </Col>
        
        <Col xs={12} md={10} lg={8} className="mx-auto">
          <Row className="g-4">
            {testimonials.map((testimonial, index) => (
              <Col xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="testimonial-card p-4"
                >
                  <div className="quote-icon mb-3">"</div>
                  <p className="testimonial-text">{testimonial.quote}</p>
                  <div className="testimonial-author">
                    <strong>{testimonial.author}</strong>
                    <small>{testimonial.role}</small>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Contact Form */}
      <Row id="contact-form" className="form-row mx-0 justify-content-center py-5">
        <Col xs={12} md={10} lg={8} xl={6} className="px-3">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="form-card">
              <Card.Body className="p-4 p-md-5">
                <h2 className="text-center mb-4">SEND US A MESSAGE</h2>
                
                {submitted ? (
                  <Alert variant="success" className="text-center p-4">
                    <FaCheck className="mb-3" style={{ fontSize: '3rem', color: '#28a745' }} />
                    <h3>Thank You!</h3>
                    <p>We've received your message and will get back to you within 24 hours.</p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button variant="danger" onClick={() => setSubmitted(false)} className="mt-3">
                        Send Another Message
                      </Button>
                    </motion.div>
                  </Alert>
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                      <Form.Label>Your Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="John Doe"
                      />
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label>Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="your@email.com"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="(123) 456-7890"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label>Subject *</Form.Label>
                      <Form.Select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="form-input"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Membership">Membership Questions</option>
                        <option value="Personal Training">Personal Training</option>
                        <option value="Group Classes">Group Classes</option>
                        <option value="Feedback">Feedback/Suggestions</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Your Message *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Tell us how we can help..."
                      />
                    </Form.Group>

                    <div className="text-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button variant="danger" type="submit" className="submit-btn py-3 px-5">
                          <FaPaperPlane className="me-2" /> Send Message
                        </Button>
                      </motion.div>
                    </div>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Google Map */}
      <Row className="map-row mx-0">
        <Col className="px-0">
          <div className="map-container">
            <iframe
              title="Gym Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2152091790357!2d-73.9878446845938!3d40.74844047932881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              allowFullScreen
              loading="lazy"
            ></iframe>
            <div className="map-overlay">
              <div className="map-info">
                <h4>VISIT OUR GYM</h4>
                <p>123 Fitness Avenue<br />Gym City, GC 12345</p>
                <Button variant="light" size="sm">
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Social Media Section */}
      <Row className="social-row mx-0 py-5">
        <Col className="text-center">
          <h2 className="section-title mb-4">FOLLOW US</h2>
          <div className="d-flex justify-content-center flex-wrap">
            {socialMedia.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon mx-3"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
                <span className="visually-hidden">{social.name}</span>
              </motion.a>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Schedule;