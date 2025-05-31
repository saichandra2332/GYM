// src/components/AnimatedLogo.jsx
import React from 'react';
import { LightningChargeFill } from 'react-bootstrap-icons';

function AnimatedLogo() {
  return (
    <div className="logo-animation" style={{ width: 50, height: 50 }}>
      <LightningChargeFill 
        color="#ff6b35" 
        size={40} 
        className="pulse" 
      />
    </div>
  );
}

export default AnimatedLogo;