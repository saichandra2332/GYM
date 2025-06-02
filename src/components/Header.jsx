import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Dropdown, Badge } from 'react-bootstrap';
import { PersonFill, GearFill, BoxArrowRight, Trophy, Fire, HeartPulse } from 'react-bootstrap-icons';
import AnimatedLogo from './AnimatedLogo';
import './Header.css'; // Create this CSS file for animations

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [glow, setGlow] = useState(false);
  const username = localStorage.getItem('fitnessHubUsername') || "FITNESS_PRO";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Add pulsing glow effect every 5 seconds
    const glowInterval = setInterval(() => {
      setGlow(true);
      setTimeout(() => setGlow(false), 1000);
    }, 5000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(glowInterval);
    };
  }, []);

  const formatUsername = (name) => {
    return name.split(/[\s_]+/).map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const handleLogout = () => {
    localStorage.removeItem('fitnessHubUsername');
  };

  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      className={`py-2 sticky-top ${scrolled ? 'navbar-shrink shadow-lg' : ''}`}
      style={{ 
        borderBottom: '3px solid #ff6b35',
        transition: 'all 0.3s ease'
      }}
    >
      <Container fluid>
        <Navbar.Brand 
          href="/home" 
          className="d-flex align-items-center brand-container"
        >
          <div className={`logo-wrapper ${glow ? 'pulse-glow' : ''}`}>
            <AnimatedLogo />
          </div>
          <span className="ms-2 text-gradient animated-title">
            <span className="title-main">FITNESS</span>
            <span className="title-accent"> HUB</span>
            <span className="flame-icon"><Fire /></span>
          </span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="main-navbar" className="border-0 custom-toggler">
          <span className="animated-hamburger"></span>
        </Navbar.Toggle>
        
        <Navbar.Collapse id="main-navbar" className="justify-content-end">
          <Nav className="align-items-center">
            <div className="nav-icons me-3 d-none d-lg-flex">
              <div className="nav-icon" title="Workouts">
                <Fire size={20} className="icon-hover" />
              </div>
              <div className="nav-icon" title="Progress">
                <HeartPulse size={20} className="icon-hover" />
              </div>
              <div className="nav-icon" title="Achievements">
                <Trophy size={20} className="icon-hover" />
              </div>
            </div>
            
            <Dropdown align="end">
              <Dropdown.Toggle variant="dark" id="user-dropdown" className="d-flex align-items-center bg-transparent border-0 user-toggle">
                <div className="position-relative me-2">
                  <div className="avatar-pulse"></div>
                  <div className="avatar-circle-sm hover-grow">
                    <PersonFill size={16} className="text-white" />
                  </div>
                </div>
                <span className="d-none d-lg-inline text-white username-text">
                  {formatUsername(username)}
                </span>
              </Dropdown.Toggle>
              
              <Dropdown.Menu className="shadow-lg dropdown-menu-expanded">
                <Dropdown.Header className="text-center py-3 bg-dark text-white dropdown-header-animated">
                  <div className="d-flex justify-content-center">
                    <div className="avatar-circle hover-rotate">
                      <PersonFill size={30} />
                    </div>
                  </div>
                  <div className="mt-2 fw-bold username-display">
                    {formatUsername(username)}
                  </div>
                  <Badge bg="danger" className="mt-1 premium-badge">
                    PREMIUM MEMBER
                  </Badge>
                </Dropdown.Header>
                
               {/* // In your Dropdown.Item for Profile, change href to "/profile" (lowercase) */}
<Dropdown.Item href="/profile" className="dropdown-item-hover">
  <PersonFill className="me-2" /> My Profile
</Dropdown.Item>
                
                <Dropdown.Item href="/settings" className="dropdown-item-hover">
                  <GearFill className="me-2" /> Settings
                </Dropdown.Item>
                
                <Dropdown.Divider />
                
                <Dropdown.Item 
                  href="/logout" 
                  className="text-danger py-2 logout-item"
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