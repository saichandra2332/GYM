import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Trophy, 
  HeartPulse 
} from 'react-bootstrap-icons';
import './Home.css';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Header */}
      <motion.header 
        className="sticky-top bg-white"
        style={{ 
          boxShadow: scrollPosition > 10 ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
          zIndex: 1000
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Header onMenuToggle={toggleMenu} />
      </motion.header>

      {/* Main Content Area */}
      <div className="d-flex flex-grow-1 position-relative">
        {/* Left Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="position-absolute position-lg-static h-100 bg-dark text-white"
              style={{ zIndex: 900, width: '250px' }}
            >
              <LeftMenu />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <motion.main 
          className="flex-grow-1 p-3 p-md-4 home-main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ 
            marginLeft: isMenuOpen ? '250px' : '0',
            transition: 'margin-left 0.3s ease'
          }}
        >
          {/* Only show home content if we're at the exact home path */}
          {location.pathname === '/home' && (
            <>
              {/* Animated Welcome Section */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="welcome-container mb-5"
>
  <h1 className="welcome-heading">
    Welcome, <span>{localStorage.getItem('fitnessHubUsername') || 'Guest'}</span>
  </h1>
  <p className="welcome-subtext">Your ultimate fitness companion</p>
</motion.div>

              {/* Stats Cards Grid */}
              <div className="stats-grid mb-5">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="stat-card primary-card"
                >
                  <div className="stat-icon">
                    <Activity size={32} />
                  </div>
                  <h3>24</h3>
                  <p>Active Workouts</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="stat-card secondary-card"
                >
                  <div className="stat-icon">
                    <Trophy size={32} />
                  </div>
                  <h3>5</h3>
                  <p>Completed Challenges</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="stat-card accent-card"
                >
                  <div className="stat-icon">
                    <HeartPulse size={32} />
                  </div>
                  <h3>98%</h3>
                  <p>Consistency Score</p>
                </motion.div>
              </div>

              {/* Recent Activity Section */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="activity-section"
              >
                <h2 className="section-title">Recent Activity</h2>
                <div className="activity-timeline">
                  {[1, 2, 3].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="activity-item"
                    >
                      <div className="activity-dot"></div>
                      <div className="activity-content">
                        <p>Completed {item === 1 ? 'Chest Day' : item === 2 ? 'HIIT Session' : 'Morning Run'}</p>
                        <small>{item === 1 ? 'Today' : item === 2 ? 'Yesterday' : '2 days ago'}</small>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Workout of the Day */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="wod-card"
              >
                <div className="wod-badge">WORKOUT OF THE DAY</div>
                <h3>Full Body Burn</h3>
                <div className="wod-stats">
                  <span>45 min</span>
                  <span>•</span>
                  <span>High Intensity</span>
                  <span>•</span>
                  <span>500 kcal</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="wod-button"
                >
                  Start Workout
                </motion.button>
              </motion.div>
            </>
          )}

          {/* This will render the nested routes (Workouts, Members, Schedule) */}
          <Outlet />
          
          {/* Mobile Menu Toggle Button */}
          <motion.button
            className="d-lg-none btn btn-primary rounded-circle position-fixed"
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              bottom: '20px',
              right: '20px',
              width: '56px',
              height: '56px',
              zIndex: 1000
            }}
          >
            {isMenuOpen ? '✕' : '☰'}
          </motion.button>
        </motion.main>
      </div>

      {/* Footer */}
      <motion.footer
        className="bg-dark text-white py-3 py-md-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Footer />
      </motion.footer>
    </div>
  );
}

export default Home;