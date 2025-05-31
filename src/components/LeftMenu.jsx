import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  House, 
  Calendar, 
  People, 
  Activity, 
  BoxArrowRight,
  Trophy,
  HeartPulse
} from 'react-bootstrap-icons';
import './LeftMenu.css'; // We'll create this CSS file

function LeftMenu() {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { path: "/home", icon: <House size={20} />, label: "Home" },
    { path: "/home/workouts", icon: <Activity size={20} />, label: "Workouts" },
    { path: "/home/members", icon: <People size={20} />, label: "Members" },
    { path: "/home/schedule", icon: <Calendar size={20} />, label: "Contact" },
    
    { path: "/logout", icon: <BoxArrowRight size={20} />, label: "Logout", className: "logout-item" }
  ];

  return (
    <Nav className="flex-column left-menu-container p-3">
      <div className="brand-logo mb-4">
        <div className="animated-dumbbell">
          <div className="bar"></div>
          <div className="weight left"></div>
          <div className="weight right"></div>
        </div>
        <span className="brand-name">FITNESS GURU</span>
      </div>
      
      {menuItems.map((item, index) => (
        <Nav.Item 
          key={index}
          onMouseEnter={() => setHoveredItem(index)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Nav.Link 
            as={Link} 
            to={item.path}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''} ${item.className || ''}`}
          >
            <span className="menu-icon">
              {React.cloneElement(item.icon, {
                className: hoveredItem === index || location.pathname === item.path ? 'icon-animate' : ''
              })}
            </span>
            <span className="menu-label">{item.label}</span>
            <span className="active-indicator"></span>
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default LeftMenu;