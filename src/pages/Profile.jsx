import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar, Tab, Tabs, Badge } from 'react-bootstrap';
import { 
  PersonFill, 
  GearFill, 
  TrophyFill, 
  HeartPulse, 
  ClockHistory,
  StarFill,
  GraphUp,
  ShieldLock,
  EnvelopeFill,
  Globe,
  Linkedin,
  Github
} from 'react-bootstrap-icons';
import './Profile.css';
import Header from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import Footer from '../components/Footer';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setStats({
        workoutsCompleted: 87,
        streakDays: 14,
        achievements: 5,
        level: 3,
        progress: 65,
        points: 1240
      });
      setLoading(false);
    }, 800);

    const handleScroll = () => {
      setParallaxOffset(window.scrollY * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fitnessGoals = [
    { name: 'Cardio', progress: 75, color: '#FF6B35' },
    { name: 'Strength', progress: 60, color: '#4ECDC4' },
    { name: 'Flexibility', progress: 45, color: '#45B7D1' },
    { name: 'Endurance', progress: 80, color: '#A37AFC' }
  ];

  const recentAchievements = [
    { id: 1, name: 'Early Bird', icon: <ClockHistory />, date: 'Today', points: 50 },
    { id: 2, name: 'Week Warrior', icon: <TrophyFill />, date: '2 days ago', points: 100 },
    { id: 3, name: 'Perfect Week', icon: <StarFill />, date: '1 week ago', points: 200 }
  ];

  const socialLinks = [
    { platform: 'Email', icon: <EnvelopeFill />, url: 'mailto:user@example.com' },
    { platform: 'Website', icon: <Globe />, url: 'https://example.com' },
    { platform: 'LinkedIn', icon: <Linkedin />, url: 'https://linkedin.com' },
    { platform: 'GitHub', icon: <Github />, url: 'https://github.com' }
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="d-flex flex-grow-1">
        <LeftMenu />
        <div className="flex-grow-1 profile-content-wrapper">
          {/* Hero Parallax Section */}
          <div 
            className="profile-hero" 
            style={{ backgroundPositionY: `${parallaxOffset}px` }}
          >
            <div className="hero-overlay"></div>
            <Container className="hero-content">
              <div className="profile-avatar-container">
                <div className="profile-avatar-wrapper">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop" 
                    alt="Profile" 
                    className="profile-avatar"
                  />
                  <div className="avatar-status"></div>
                  <div className="avatar-ring"></div>
                  <div className="avatar-pulse"></div>
                </div>
                <div className="profile-badge">PRO</div>
              </div>
              <h1 className="profile-name">Alex Johnson</h1>
              <p className="profile-title">Fitness Enthusiast • Level 3 Member</p>
            </Container>
          </div>

          {/* Stats Bar */}
          <div className="profile-stats-bar">
            <Container>
              <Row>
                <Col xs={6} md={3}>
                  <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: 'rgba(255, 107, 53, 0.1)' }}>
                      <HeartPulse color="#FF6B35" size={24} />
                    </div>
                    <div className="stat-info">
                      <h3>{loading ? '--' : stats?.workoutsCompleted}</h3>
                      <p>Workouts</p>
                    </div>
                    <div className="stat-wave"></div>
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: 'rgba(78, 205, 196, 0.1)' }}>
                      <ClockHistory color="#4ECDC4" size={24} />
                    </div>
                    <div className="stat-info">
                      <h3>{loading ? '--' : stats?.streakDays}</h3>
                      <p>Day Streak</p>
                    </div>
                    <div className="stat-wave"></div>
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: 'rgba(69, 183, 209, 0.1)' }}>
                      <TrophyFill color="#45B7D1" size={24} />
                    </div>
                    <div className="stat-info">
                      <h3>{loading ? '--' : stats?.achievements}</h3>
                      <p>Achievements</p>
                    </div>
                    <div className="stat-wave"></div>
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: 'rgba(163, 122, 252, 0.1)' }}>
                      <GraphUp color="#A37AFC" size={24} />
                    </div>
                    <div className="stat-info">
                      <h3>{loading ? '--' : stats?.level}</h3>
                      <p>Level</p>
                    </div>
                    <div className="stat-wave"></div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

          {/* Main Content */}
          <Container className="profile-content">
            <Row>
              <Col lg={4}>
                {/* About Card */}
                <Card className="profile-about-card">
                  <Card.Body>
                    <h3 className="card-title">
                      <PersonFill className="icon-spin" /> About Me
                    </h3>
                    <p className="about-text">
                      Passionate fitness trainer with 5+ years of experience helping clients achieve their goals. 
                      Specializing in HIIT and strength training.
                    </p>
                    
                    <div className="about-details">
                      <div className="detail-item">
                        <span className="detail-label">Member Since</span>
                        <span className="detail-value">Jan 2022</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Location</span>
                        <span className="detail-value">New York, USA</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Specialty</span>
                        <span className="detail-value">Strength Training</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="progress-section">
                      <div className="progress-header">
                        <span>Next Level Progress</span>
                        <span>{stats?.progress || 0}%</span>
                      </div>
                      <ProgressBar now={stats?.progress || 0} className="level-progress" />
                      <div className="progress-points">
                        <TrophyFill className="text-warning" /> {stats?.points || 0} XP Points
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="social-links">
                      <h4>Connect With Me</h4>
                      <div className="social-icons">
                        {socialLinks.map((link, index) => (
                          <a 
                            key={index} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="social-icon"
                            aria-label={link.platform}
                          >
                            {React.cloneElement(link.icon, { size: 20 })}
                          </a>
                        ))}
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Goals Card */}
                <Card className="profile-goals-card">
                  <Card.Body>
                    <h3 className="card-title">
                      <StarFill className="icon-float" /> My Goals
                    </h3>
                    <div className="goals-list">
                      {fitnessGoals.map((goal, index) => (
                        <div key={index} className="goal-item">
                          <div className="goal-info">
                            <span className="goal-name">{goal.name}</span>
                            <span className="goal-percent">{goal.progress}%</span>
                          </div>
                          <ProgressBar now={goal.progress} className="goal-progress" 
                            style={{ '--goal-color': goal.color }} />
                        </div>
                      ))}
                    </div>
                    <button className="btn-goal-add">
                      + Add New Goal
                    </button>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={8}>
                {/* Tabs Section */}
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="profile-tabs"
                >
                  <Tab eventKey="about" title={
                    <span><PersonFill /> About</span>
                  }>
                    <Card className="tab-content-card">
                      <Card.Body>
                        <h4 className="section-title">Bio</h4>
                        <p className="bio-text">
                          Certified personal trainer and nutrition specialist with a passion for 
                          helping clients transform their lives through fitness. My approach 
                          combines science-based training with motivational coaching to help 
                          you achieve sustainable results.
                        </p>

                        <h4 className="section-title">Certifications</h4>
                        <div className="certifications">
                          <Badge bg="primary" className="cert-badge">
                            NASM Certified
                          </Badge>
                          <Badge bg="success" className="cert-badge">
                            ACE Nutrition
                          </Badge>
                          <Badge bg="info" className="cert-badge">
                            CrossFit L1
                          </Badge>
                          <Badge bg="warning" className="cert-badge">
                            Yoga Alliance
                          </Badge>
                        </div>

                        <h4 className="section-title">Workout Preferences</h4>
                        <div className="preferences">
                          <div className="pref-item">
                            <div className="pref-icon">
                              <HeartPulse />
                            </div>
                            <div className="pref-text">
                              <h5>Favorite Workout</h5>
                              <p>HIIT & Strength Training</p>
                            </div>
                          </div>
                          <div className="pref-item">
                            <div className="pref-icon">
                              <ClockHistory />
                            </div>
                            <div className="pref-text">
                              <h5>Preferred Time</h5>
                              <p>Morning (6-9 AM)</p>
                            </div>
                          </div>
                          <div className="pref-item">
                            <div className="pref-icon">
                              <ShieldLock />
                            </div>
                            <div className="pref-text">
                              <h5>Difficulty Level</h5>
                              <p>Advanced</p>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Tab>

                  <Tab eventKey="achievements" title={
                    <span><TrophyFill /> Achievements</span>
                  }>
                    <Card className="tab-content-card">
                      <Card.Body>
                        <h4 className="section-title">Recent Achievements</h4>
                        <div className="achievements-grid">
                          {recentAchievements.map(achievement => (
                            <div key={achievement.id} className="achievement-card">
                              <div className="achievement-icon">
                                {achievement.icon}
                              </div>
                              <div className="achievement-content">
                                <h5>{achievement.name}</h5>
                                <p className="achievement-date">{achievement.date}</p>
                                <Badge bg="warning" className="achievement-points">
                                  +{achievement.points} XP
                                </Badge>
                              </div>
                              <div className="achievement-glow"></div>
                            </div>
                          ))}
                        </div>

                        <h4 className="section-title">All Badges</h4>
                        <div className="badges-grid">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(badge => (
                            <div key={badge} className="badge-item">
                              <div className="badge-icon">
                                <TrophyFill />
                              </div>
                              <div className="badge-lock"></div>
                            </div>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>
                  </Tab>

                  <Tab eventKey="settings" title={
                    <span><GearFill /> Settings</span>
                  }>
                    <Card className="tab-content-card">
                      <Card.Body>
                        <h4 className="section-title">Account Settings</h4>
                        <div className="settings-list">
                          <div className="setting-item">
                            <div className="setting-icon">
                              <PersonFill />
                            </div>
                            <div className="setting-text">
                              <h5>Profile Information</h5>
                              <p>Update your personal details and preferences</p>
                            </div>
                            <button className="btn-setting-edit">
                              Edit
                            </button>
                          </div>
                          <div className="setting-item">
                            <div className="setting-icon">
                              <ShieldLock />
                            </div>
                            <div className="setting-text">
                              <h5>Privacy & Security</h5>
                              <p>Manage your account security settings</p>
                            </div>
                            <button className="btn-setting-edit">
                              Edit
                            </button>
                          </div>
                          <div className="setting-item">
                            <div className="setting-icon">
                              <EnvelopeFill />
                            </div>
                            <div className="setting-text">
                              <h5>Notifications</h5>
                              <p>Configure your notification preferences</p>
                            </div>
                            <button className="btn-setting-edit">
                              Edit
                            </button>
                          </div>
                        </div>

                        <h4 className="section-title">Subscription</h4>
                        <div className="subscription-card">
                          <div className="sub-header">
                            <h5>Premium Membership</h5>
                            <Badge bg="success" className="sub-status">
                              Active
                            </Badge>
                          </div>
                          <p className="sub-desc">
                            Full access to all workouts, personalized training plans, and premium features.
                          </p>
                          <div className="sub-details">
                            <div className="sub-renewal">
                              <span>Renews on:</span>
                              <strong>Jan 15, 2024</strong>
                            </div>
                            <button className="btn-sub-manage">
                              Manage Subscription
                            </button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;