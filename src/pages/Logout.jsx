import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
import './Logout.css'; // Create this CSS file (code provided below)

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session or any stored data
    localStorage.removeItem('fitnessHubUsername');
    document.body.classList.add('logout-page');
    return () => document.body.classList.remove('logout-page');
  }, []);

  const handleLoginAgain = () => {
    navigate('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="logout-background"
    >
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Card className="logout-card p-4 text-center">
            <Card.Body>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="logout-icon-container"
              >
                <BsCheckCircleFill className="logout-success-icon" />
              </motion.div>
              
              <motion.h2 
                className="mb-3 logout-title"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Logged Out Successfully
              </motion.h2>
              
              <motion.p
                className="logout-message mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                You have been successfully logged out of <span>FITNESS GURU</span>.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button 
                  variant="primary" 
                  onClick={handleLoginAgain}
                  className="logout-button"
                >
                  <FaSignInAlt className="me-2" />
                  Login Again
                </Button>
              </motion.div>
              
              <motion.div
                className="mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <small className="text-muted">See you again soon!</small>
              </motion.div>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>
    </motion.div>
  );
}

export default Logout;