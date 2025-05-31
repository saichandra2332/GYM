import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Trophy, 
  HeartPulse,
  LightningCharge,
  Clock,
  Fire,
  GraphUp,
  Person,
  Calendar
} from 'react-bootstrap-icons';
import './Home.css';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeStat, setActiveStat] = useState(null);
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

  const stats = [
    { id: 1, icon: <Activity size={28} />, value: "24", label: "Active Workouts", color: "#FF6B35" },
    { id: 2, icon: <Trophy size={28} />, value: "5", label: "Completed Challenges", color: "#20C997" },
    { id: 3, icon: <HeartPulse size={28} />, value: "98%", label: "Consistency Score", color: "#6F42C1" },
    { id: 4, icon: <GraphUp size={28} />, value: "+12%", label: "Progress This Month", color: "#FD7E14" }
  ];

  const recentActivities = [
    { id: 1, type: 'workout', title: 'Chest Day', time: 'Today', duration: '45 min', intensity: 'High', icon: <Fire /> },
    { id: 2, type: 'challenge', title: 'HIIT Session', time: 'Yesterday', duration: '30 min', intensity: 'Extreme', icon: <LightningCharge /> },
    { id: 3, type: 'cardio', title: 'Morning Run', time: '2 days ago', duration: '1h 15min', intensity: 'Medium', icon: <Activity /> }
  ];

  const weeklyGoals = [
    { id: 1, title: 'Workout Days', target: 5, completed: 3, icon: <Calendar /> },
    { id: 2, title: 'Water Intake', target: 3.5, completed: 2.8, unit: 'L', icon: <Person /> },
    { id: 3, title: 'Active Minutes', target: 300, completed: 180, icon: <Clock /> }
  ];

  return (
    <div className="d-flex flex-column min-vh-100 fitness-app">
      {/* Header */}
      <motion.header 
        className="sticky-top"
        style={{ 
          boxShadow: scrollPosition > 10 ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
          zIndex: 1000,
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
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
              className="position-absolute position-lg-static h-100"
              style={{ 
                zIndex: 900, 
                width: '250px',
                background: 'linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
              }}
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
                <div className="welcome-content">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="welcome-text"
                  >
                    <h1 className="welcome-heading">
                      Welcome back, <span>{localStorage.getItem('fitnessHubUsername') || 'Fitness Warrior'}</span>
                    </h1>
                    <p className="welcome-subtext">Ready to crush your goals today?</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="welcome-badge"
                  >
                    <Trophy size={24} />
                    <span>Gold Member</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Stats Cards Grid */}
              <div className="stats-grid mb-5">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`stat-card ${activeStat === stat.id ? 'active' : ''}`}
                    onMouseEnter={() => setActiveStat(stat.id)}
                    onMouseLeave={() => setActiveStat(null)}
                    style={{ borderTop: `4px solid ${stat.color}` }}
                  >
                    <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                      {stat.icon}
                    </div>
                    <motion.h3 
                      animate={activeStat === stat.id ? { scale: 1.1 } : { scale: 1 }}
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </motion.h3>
                    <p>{stat.label}</p>
                    {activeStat === stat.id && (
                      <motion.div 
                        className="stat-hover-effect"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ background: stat.color }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Dashboard Grid */}
              <div className="dashboard-grid mb-5">
                {/* Recent Activity Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="activity-section"
                >
                  <h2 className="section-title">
                    <LightningCharge size={20} className="me-2" />
                    Recent Activity
                  </h2>
                  <div className="activity-timeline">
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.15 }}
                        className="activity-item"
                        whileHover={{ y: -5 }}
                      >
                        <div className="activity-dot" style={{ background: activity.type === 'workout' ? '#FF6B35' : activity.type === 'challenge' ? '#20C997' : '#6F42C1' }}></div>
                        <div className="activity-content">
                          <div className="activity-icon" style={{ color: activity.type === 'workout' ? '#FF6B35' : activity.type === 'challenge' ? '#20C997' : '#6F42C1' }}>
                            {activity.icon}
                          </div>
                          <div>
                            <p className="activity-title">{activity.title}</p>
                            <div className="activity-meta">
                              <span>{activity.time}</span>
                              <span>•</span>
                              <span>{activity.duration}</span>
                              <span>•</span>
                              <span className="intensity-badge" style={{ 
                                background: activity.intensity === 'High' ? '#FF6B3520' : activity.intensity === 'Extreme' ? '#DC354520' : '#20C99720',
                                color: activity.intensity === 'High' ? '#FF6B35' : activity.intensity === 'Extreme' ? '#DC3545' : '#20C997'
                              }}>
                                {activity.intensity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Weekly Goals */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="goals-section"
                >
                  <h2 className="section-title">
                    <Calendar size={20} className="me-2" />
                    Weekly Goals
                  </h2>
                  <div className="goals-list">
                    {weeklyGoals.map((goal, index) => (
                      <motion.div
                        key={goal.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="goal-item"
                      >
                        <div className="goal-icon">
                          {goal.icon}
                        </div>
                        <div className="goal-info">
                          <h4>{goal.title}</h4>
                          <div className="progress-container">
                            <div 
                              className="progress-bar" 
                              style={{ 
                                width: `${(goal.completed / goal.target) * 100}%`,
                                background: `linear-gradient(90deg, ${getProgressColor(goal.completed/goal.target)}, ${getProgressColor(goal.completed/goal.target, true)})`
                              }}
                            ></div>
                          </div>
                          <span className="goal-progress">
                            {goal.completed}{goal.unit || ''} / {goal.target}{goal.unit || ''}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Workout of the Day */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
                className="wod-card"
              >
                <div className="wod-badge">WORKOUT OF THE DAY</div>
                <div className="wod-content">
                  <div>
                    <h3>Full Body Burn</h3>
                    <div className="wod-stats">
                      <span><Clock size={16} /> 45 min</span>
                      <span>•</span>
                      <span><Fire size={16} /> High Intensity</span>
                      <span>•</span>
                      <span>🔥 500 kcal</span>
                    </div>
                    <p className="wod-description">
                      A high-intensity full body workout designed to maximize fat burn and build endurance.
                    </p>
                  </div>
                  <div className="wod-image"></div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(255,107,53,0.4)' }}
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
              zIndex: 1000,
              background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B53 100%)',
              border: 'none'
            }}
          >
            {isMenuOpen ? '✕' : '☰'}
          </motion.button>
        </motion.main>
      </div>

      {/* Footer */}
      <motion.footer
        className="py-3 py-md-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
        }}
      >
        <Footer />
      </motion.footer>
    </div>
  );
}

// Helper function for progress bar colors
function getProgressColor(percentage, isLight = false) {
  if (percentage >= 0.8) return isLight ? '#20C997' : '#198754';
  if (percentage >= 0.5) return isLight ? '#FFC107' : '#FD7E14';
  return isLight ? '#FF6B35' : '#DC3545';
}

export default Home;