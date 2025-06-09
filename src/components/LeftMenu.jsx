import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  House, 
  Calendar, 
  People, 
  Activity, 
  BoxArrowRight,
  PersonBadge,
  Trophy,
  HeartPulse,
  Gear,
  GraphUp,
  Apple,
  PersonArmsUp,
  CreditCard // Added CreditCard icon for payments
} from 'react-bootstrap-icons';
import './LeftMenu.css';

const DEFAULT_PROFILE_IMAGE = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop';

function LeftMenu() {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeGlow, setActiveGlow] = useState(false);
  const [ripple, setRipple] = useState(null);
  
  const storedUsername = localStorage.getItem('fitnessHubUsername') || "Guest";
  
  const [user] = useState({
    name: storedUsername,
    avatar: DEFAULT_PROFILE_IMAGE,
    status: "Premium Member"
  });

  useEffect(() => {
    // Trigger glow effect when path changes
    setActiveGlow(true);
    const timer = setTimeout(() => setActiveGlow(false), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const menuItems = [
    { path: "/home", icon: <House />, label: "Dashboard", color: "#FF6B35" },
    { path: "/home/workouts", icon: <Activity />, label: "Workouts", color: "#4ECDC4" },
    { path: "/home/members", icon: <People />, label: "Community", color: "#45B7D1" },
    { path: "/home/trainers", icon: <PersonArmsUp />, label: "Trainers", color: "#FFA630" },
    { path: "/nutrition", icon: <Apple />, label: "Nutrition", color: "#28a745" },
    { path: "/progress", icon: <GraphUp />, label: "Progress", color: "#6f42c1" },
    { path: "/payment", icon: <CreditCard />, label: "Payments", color: "#28a745" }, // Changed icon here
    { path: "/home/schedule", icon: <Calendar />, label: "Schedule", color: "#FFA630" },
    { path: "/settings", icon: <Gear />, label: "Settings", color: "#808080" },
    { path: "/profile", icon: <PersonBadge />, label: "Profile", color: "#A78AFF" },
    { path: "/logout", icon: <BoxArrowRight />, label: "Logout", color: "#FF3366", className: "logout-item" }
  ];
  const handleClick = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipple({ x, y, index });
    setTimeout(() => setRipple(null), 600);
  };

  return (
    <Nav className="flex-column left-menu-container p-3">
      <div className="user-profile mb-4">
        <div className="avatar-container">
          <img 
            src={user.avatar} 
            alt="User" 
            className="user-avatar"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
            }}
          />
          <div className="status-indicator"></div>
        </div>
        <div className="user-info">
          <div className="user-name">{user.name}</div>
          <div className="user-status">{user.status}</div>
        </div>
        <div className="user-profile-bg"></div>
      </div>
      
      <div className="menu-items-container">
        {menuItems.map((item, index) => (
          <Nav.Item 
            key={index}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={(e) => handleClick(e, index)}
          >
            <Nav.Link 
              as={Link} 
              to={item.path}
              className={`menu-item ${location.pathname === item.path ? 'active' : ''} ${item.className || ''}`}
              style={{
                '--item-color': item.color,
                '--item-hover-color': `${item.color}40`,
                '--item-active-color': `${item.color}20`
              }}
            >
              {ripple?.index === index && (
                <span 
                  className="ripple-effect" 
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    backgroundColor: item.color
                  }}
                />
              )}
              
              <span className="menu-icon">
                {React.cloneElement(item.icon, {
                  size: 20,
                  className: `${hoveredItem === index ? 'icon-hover' : ''} ${location.pathname === item.path ? 'icon-active' : ''}`
                })}
              </span>
              
              <span className="menu-label">{item.label}</span>
              
              <span className="active-indicator"></span>
              
              {location.pathname === item.path && activeGlow && (
                <span className="active-glow"></span>
              )}
              
              {hoveredItem === index && (
                <span className="hover-pulse" style={{ backgroundColor: item.color }}></span>
              )}
            </Nav.Link>
          </Nav.Item>
        ))}
      </div>
      
      <div className="menu-footer">
        <div className="fitness-progress">
          <div className="progress-text">Daily Goal</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '75%' }}></div>
          </div>
          <div className="progress-percent">75%</div>
        </div>
      </div>
    </Nav>
  );
}

export default LeftMenu;