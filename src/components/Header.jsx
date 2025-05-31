import React from 'react';
import { Navbar, Container, Nav, Dropdown, Badge } from 'react-bootstrap';
import { PersonFill, GearFill, BoxArrowRight } from 'react-bootstrap-icons';
import AnimatedLogo from './AnimatedLogo';

function Header() {
  // Get username from localStorage or use default
  const username = localStorage.getItem('fitnessHubUsername') || "FITNESS_PRO";

  // Format username attractively
  const formatUsername = (name) => {
    return name.split(/[\s_]+/).map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('fitnessHubUsername');
    // In a real app, you would redirect to login page
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-2 shadow" style={{ borderBottom: '3px solid #ff6b35' }}>
      <Container fluid>
        <Navbar.Brand 
          href="/home" 
          className="d-flex align-items-center"
          style={{ fontFamily: "'Bangers', cursive", letterSpacing: '1px' }}
        >
          <AnimatedLogo />
          <span className="ms-2 text-gradient" style={{ fontSize: '1.8rem' }}>
            FITNESS<span style={{ color: '#ff6b35' }}> GURU</span>
          </span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="main-navbar" className="border-0">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        
        <Navbar.Collapse id="main-navbar" className="justify-content-end">
          <Nav className="align-items-center">
            <Dropdown align="end">
              <Dropdown.Toggle variant="dark" id="user-dropdown" className="d-flex align-items-center bg-transparent border-0">
                <div className="position-relative me-2">
                  <div className="avatar-pulse"></div>
                  <div className="avatar-circle-sm" style={{
                    background: 'linear-gradient(135deg, #ff6b35, #f7c59f)',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%'
                  }}>
                    <PersonFill size={16} className="text-white" />
                  </div>
                </div>
                <span className="d-none d-lg-inline text-white">
                  <span style={{
                    fontWeight: 'bold',
                    background: 'linear-gradient(90deg, #ff6b35, #f7c59f)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 5px rgba(255,107,53,0.3)'
                  }}>
                    {formatUsername(username)}
                  </span>
                </span>
              </Dropdown.Toggle>
              
              <Dropdown.Menu className="shadow-lg" style={{ minWidth: '250px' }}>
                <Dropdown.Header className="text-center py-3 bg-dark text-white">
                  <div className="d-flex justify-content-center">
                    <div className="avatar-circle" style={{
                      background: 'linear-gradient(135deg, #ff6b35, #f7c59f)',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%'
                    }}>
                      <PersonFill size={30} />
                    </div>
                  </div>
                  <div className="mt-2 fw-bold" style={{ fontSize: '1.2rem' }}>
                    {formatUsername(username)}
                  </div>
                  <Badge bg="danger" className="mt-1" style={{ 
                    fontSize: '0.8rem',
                    padding: '5px 10px',
                    borderRadius: '20px',
                    fontWeight: 'normal'
                  }}>
                    PREMIUM MEMBER
                  </Badge>
                </Dropdown.Header>
                <Dropdown.Divider />
                
                
                <Dropdown.Divider />
                <Dropdown.Item 
                  href="/logout" 
                  className="text-danger py-2"
                  onClick={handleLogout}
                >
                  <BoxArrowRight className="me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;