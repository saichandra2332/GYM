import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { FaUser, FaLock, FaRunning } from 'react-icons/fa';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();  // Prevent page reload
  setIsLoading(true);
  
  // Simple validation
  if (!username || !password) {
    setError('Please enter both username and password');
    setIsLoading(false);
    return;
  }
  if (password.length < 6) {
    setError('Password must be at least 6 characters');
    setIsLoading(false);
    return;
  }

  // Store username in localStorage
  localStorage.setItem('fitnessHubUsername', username.trim());

  // Simulate API call with timeout
  setTimeout(() => {
    setIsLoading(false);
    navigate('/home');
  }, 1500);
};

  return (
    <div className="login-background">
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Card className="login-card animate__animated animate__fadeIn">
          <Card.Body className="p-4">
            <div className="text-center mb-4">
              <FaRunning className="login-icon animate__animated animate__bounceIn" />
              <h2 className="login-title">FITNESS GURU</h2>
              <p className="text-muted">Your journey starts here</p>
            </div>
            
            {error && (
              <Alert 
                variant="danger" 
                className="animate__animated animate__shakeX"
                onClose={() => setError('')} 
                dismissible
              >
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 form-group">
                <Form.Label className="form-label">
                  <FaUser className="me-2" /> Username
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                />
              </Form.Group>

              <Form.Group className="mb-4 form-group">
                <Form.Label className="form-label">
                  <FaLock className="me-2" /> Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 login-button"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'LOGIN'}
              </Button>
            </Form>

            <div className="text-center mt-3">
              <a href="#forgot" className="forgot-link">Forgot password?</a>
              <p className="mt-2 text-muted">New member? <a href="#signup" className="signup-link">Sign up now</a></p>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Login;