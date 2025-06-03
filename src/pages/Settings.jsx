import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Form, 
  Card, 
  Button, 
  Accordion, 
  Badge,
  ProgressBar,
  ToggleButton,
  ToggleButtonGroup
} from 'react-bootstrap';
import { 
  Gear, 
  Palette, 
  Bell, 
  ShieldLock, 
  CreditCard, 
  Globe, 
  PersonBadge,
  ArrowRepeat,
  CheckCircle,
  XCircle,
  Moon,
  Sun
} from 'react-bootstrap-icons';
import { motion, AnimatePresence } from 'framer-motion';
import './Settings.css'; // We'll create this CSS file

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
const [theme, setTheme] = useState(localStorage.getItem('fitnessHubTheme') || 'light');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    weeklySummary: true
  });
  const [formData, setFormData] = useState({
    username: localStorage.getItem('fitnessHubUsername') || 'FitnessPro',
    email: 'user@example.com',
    phone: '',
    units: 'metric',
    language: 'english'
  });
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [securityCode, setSecurityCode] = useState(generateSecurityCode());
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  function generateSecurityCode() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSaveStatus('success');
      
      // Update username in localStorage if changed
      if (formData.username !== localStorage.getItem('fitnessHubUsername')) {
        localStorage.setItem('fitnessHubUsername', formData.username);
      }
      
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1500);
  };

  const validatePassword = () => {
    const errors = {};
    
    if (password.new.length < 8) {
      errors.length = 'Password must be at least 8 characters';
    }
    
    if (!/\d/.test(password.new)) {
      errors.number = 'Password must contain at least one number';
    }
    
    if (!/[A-Z]/.test(password.new)) {
      errors.uppercase = 'Password must contain at least one uppercase letter';
    }
    
    if (password.new !== password.confirm) {
      errors.match = 'Passwords do not match';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      // Handle password change logic
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        setPassword({
          current: '',
          new: '',
          confirm: ''
        });
        setSecurityCode(generateSecurityCode());
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(null), 3000);
      }, 1500);
    }
  };

  const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  localStorage.setItem('fitnessHubTheme', newTheme);
};

  const settingsTabs = [
    { id: 'general', icon: <Gear />, label: 'General' },
    { id: 'appearance', icon: <Palette />, label: 'Appearance' },
    { id: 'notifications', icon: <Bell />, label: 'Notifications' },
    { id: 'security', icon: <ShieldLock />, label: 'Security' },
    { id: 'billing', icon: <CreditCard />, label: 'Billing' },
    { id: 'privacy', icon: <Globe />, label: 'Privacy' }
  ];

  const securityFeatures = [
    { name: 'Two-Factor Authentication', enabled: true, description: 'Add an extra layer of security' },
    { name: 'Login Alerts', enabled: true, description: 'Get notified of new logins' },
    { name: 'Password Protection', enabled: true, description: 'Strong password requirements' },
    { name: 'Session Timeout', enabled: false, description: 'Automatically log out after 30 mins' }
  ];

  return (
    <Container fluid className={`settings-container ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <Row>
        <Col md={3} className="settings-sidebar p-0">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="sidebar-header"
          >
            <PersonBadge size={24} className="me-2" />
            <h5>Account Settings</h5>
          </motion.div>
          
          <div className="sidebar-tabs">
            {settingsTabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div 
                    className="tab-indicator"
                    layoutId="tabIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
          
          <div className="sidebar-footer">
            <div className="security-badge">
              <ShieldLock size={14} className="me-2" />
              <span>Security Code: {securityCode}</span>
            </div>
          </div>
        </Col>
        
        <Col md={9} className="settings-content p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'general' && (
                <Card className="settings-card">
                  <Card.Header className="settings-card-header">
                    <Gear size={20} className="me-2" />
                    <span>General Settings</span>
                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="animated-input"
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="animated-input"
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="animated-input"
                          placeholder="Add phone number"
                        />
                      </Form.Group>
                      
                      <div className="d-flex justify-content-between">
                        <Form.Group className="mb-3">
                          <Form.Label>Measurement Units</Form.Label>
                          <ToggleButtonGroup
                            type="radio"
                            name="units"
                            value={formData.units}
                            onChange={(val) => setFormData({...formData, units: val})}
                          >
                            <ToggleButton
                              id="units-metric"
                              value="metric"
                              variant="outline-primary"
                            >
                              Metric
                            </ToggleButton>
                            <ToggleButton
                              id="units-imperial"
                              value="imperial"
                              variant="outline-primary"
                            >
                              Imperial
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Language</Form.Label>
                          <Form.Select
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className="animated-select"
                          >
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                            <option value="french">French</option>
                            <option value="german">German</option>
                          </Form.Select>
                        </Form.Group>
                      </div>
                      
                      <motion.div
                        className="save-button-container"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={saving}
                          className="save-button"
                        >
                          {saving ? (
                            <>
                              <ArrowRepeat className="spin-animation me-2" />
                              Saving...
                            </>
                          ) : (
                            'Save Changes'
                          )}
                        </Button>
                      </motion.div>
                      
                      <AnimatePresence>
                        {saveStatus === 'success' && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="save-status success"
                          >
                            <CheckCircle className="me-2" />
                            Settings saved successfully!
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Form>
                  </Card.Body>
                </Card>
              )}
              
              {activeTab === 'appearance' && (
                <Card className="settings-card">
                  <Card.Header className="settings-card-header">
                    <Palette size={20} className="me-2" />
                    <span>Appearance</span>
                  </Card.Header>
                  <Card.Body>
                    <div className="theme-selector mb-4">
                      <h5>Theme</h5>
                      <div className="theme-options">
  <motion.div 
    className={`theme-option ${theme === 'light' ? 'active' : ''}`}
    onClick={() => setTheme('light')}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="theme-preview light">
      <Sun size={24} />
    </div>
    <span>Light</span>
    {theme === 'light' && (
      <motion.div 
        className="theme-check"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <CheckCircle size={20} />
      </motion.div>
    )}
  </motion.div>
  <motion.div 
    className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
    onClick={() => setTheme('dark')}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="theme-preview dark">
      <Moon size={24} />
    </div>
    <span>Dark</span>
    {theme === 'dark' && (
      <motion.div 
        className="theme-check"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <CheckCircle size={20} />
      </motion.div>
    )}
  </motion.div>
</div>
                    </div>
                    
                    <div className="accent-color-selector mb-4">
                      <h5>Accent Color</h5>
                      <div className="color-options">
                        {['#FF6B35', '#4ECDC4', '#45B7D1', '#A78AFF', '#FFA630', '#FF3366'].map(color => (
                          <motion.div
                            key={color}
                            className="color-option"
                            style={{ backgroundColor: color }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="animation-settings">
                      <h5>Animations</h5>
                      <Form.Check
                        type="switch"
                        id="animations-switch"
                        label="Enable UI Animations"
                        defaultChecked
                      />
                      <Form.Check
                        type="switch"
                        id="hover-effects-switch"
                        label="Enable Hover Effects"
                        defaultChecked
                        className="mt-2"
                      />
                    </div>
                  </Card.Body>
                </Card>
              )}
              
              {activeTab === 'notifications' && (
                <Card className="settings-card">
                  <Card.Header className="settings-card-header">
                    <Bell size={20} className="me-2" />
                    <span>Notifications</span>
                  </Card.Header>
                  <Card.Body>
                    <div className="notification-settings">
                      <h5 className="mb-4">Notification Preferences</h5>
                      
                      <div className="notification-item">
                        <div className="notification-info">
                          <h6>Email Notifications</h6>
                          <p>Receive important updates via email</p>
                        </div>
                        <Form.Check
                          type="switch"
                          checked={notifications.email}
                          onChange={() => handleNotificationChange('email')}
                          className="notification-switch"
                        />
                      </div>
                      
                      <div className="notification-item">
                        <div className="notification-info">
                          <h6>Push Notifications</h6>
                          <p>Get instant alerts on your device</p>
                        </div>
                        <Form.Check
                          type="switch"
                          checked={notifications.push}
                          onChange={() => handleNotificationChange('push')}
                          className="notification-switch"
                        />
                      </div>
                      
                      <div className="notification-item">
                        <div className="notification-info">
                          <h6>SMS Alerts</h6>
                          <p>Text messages for critical alerts</p>
                        </div>
                        <Form.Check
                          type="switch"
                          checked={notifications.sms}
                          onChange={() => handleNotificationChange('sms')}
                          className="notification-switch"
                        />
                      </div>
                      
                      <div className="notification-item">
                        <div className="notification-info">
                          <h6>Weekly Progress Summary</h6>
                          <p>Your weekly fitness report</p>
                        </div>
                        <Form.Check
                          type="switch"
                          checked={notifications.weeklySummary}
                          onChange={() => handleNotificationChange('weeklySummary')}
                          className="notification-switch"
                        />
                      </div>
                    </div>
                    
                    <div className="notification-schedule mt-5">
                      <h5 className="mb-3">Notification Schedule</h5>
                      <div className="time-slots">
                        {['Morning', 'Afternoon', 'Evening'].map(time => (
                          <div key={time} className="time-slot">
                            <span>{time}</span>
                            <Form.Check
                              type="switch"
                              defaultChecked={time !== 'Evening'}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              )}
              
              {activeTab === 'security' && (
                <Card className="settings-card">
                  <Card.Header className="settings-card-header">
                    <ShieldLock size={20} className="me-2" />
                    <span>Security</span>
                  </Card.Header>
                  <Card.Body>
                    <div className="security-features mb-5">
                      <h5 className="mb-4">Security Features</h5>
                      {securityFeatures.map((feature, index) => (
                        <motion.div
                          key={index}
                          className="security-feature"
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="feature-info">
                            <h6>{feature.name}</h6>
                            <p>{feature.description}</p>
                          </div>
                          <Form.Check
                            type="switch"
                            checked={feature.enabled}
                            className="feature-switch"
                          />
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="password-change">
                      <h5 className="mb-4">Change Password</h5>
                      <Form onSubmit={handlePasswordSubmit}>
                        <Form.Group className="mb-3">
                          <Form.Label>Current Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="current"
                            value={password.current}
                            onChange={handlePasswordChange}
                            className="animated-input"
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>New Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="new"
                            value={password.new}
                            onChange={handlePasswordChange}
                            className="animated-input"
                          />
                          {passwordErrors.length && (
                            <Form.Text className="text-danger">
                              {passwordErrors.length}
                            </Form.Text>
                          )}
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Confirm New Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirm"
                            value={password.confirm}
                            onChange={handlePasswordChange}
                            className="animated-input"
                          />
                          {passwordErrors.match && (
                            <Form.Text className="text-danger">
                              {passwordErrors.match}
                            </Form.Text>
                          )}
                        </Form.Group>
                        
                        <div className="password-strength mb-4">
                          <div className="d-flex justify-content-between mb-1">
                            <span>Password Strength</span>
                            <span>{password.new.length > 0 ? 'Medium' : 'None'}</span>
                          </div>
                          <ProgressBar
                            now={password.new.length > 0 ? 60 : 0}
                            variant={password.new.length > 0 ? 'warning' : 'secondary'}
                            className="strength-bar"
                          />
                          <div className="password-requirements mt-2">
                            <p className={passwordErrors.length ? 'text-danger' : 'text-success'}>
                              {passwordErrors.length ? '✗' : '✓'} At least 8 characters
                            </p>
                            <p className={passwordErrors.number ? 'text-danger' : 'text-success'}>
                              {passwordErrors.number ? '✗' : '✓'} Contains a number
                            </p>
                            <p className={passwordErrors.uppercase ? 'text-danger' : 'text-success'}>
                              {passwordErrors.uppercase ? '✗' : '✓'} Contains uppercase letter
                            </p>
                          </div>
                        </div>
                        
                        <motion.div
                          className="save-button-container"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="submit"
                            variant="primary"
                            disabled={saving}
                            className="save-button"
                          >
                            {saving ? (
                              <>
                                <ArrowRepeat className="spin-animation me-2" />
                                Updating...
                              </>
                            ) : (
                              'Change Password'
                            )}
                          </Button>
                        </motion.div>
                        
                        <AnimatePresence>
                          {saveStatus === 'success' && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="save-status success"
                            >
                              <CheckCircle className="me-2" />
                              Password updated successfully!
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Form>
                    </div>
                  </Card.Body>
                </Card>
              )}
              
              {activeTab === 'billing' && (
                <Card className="settings-card">
                  <Card.Header className="settings-card-header">
                    <CreditCard size={20} className="me-2" />
                    <span>Billing & Payments</span>
                  </Card.Header>
                  <Card.Body>
                    <div className="subscription-status mb-5">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h5>Premium Membership</h5>
                          <p className="text-muted">Active until June 30, 2023</p>
                        </div>
                        <Badge bg="success" className="status-badge">
                          Active
                        </Badge>
                      </div>
                      <div className="progress-container mt-3">
                        <div className="d-flex justify-content-between mb-1">
                          <span>Days remaining</span>
                          <span>24/30</span>
                        </div>
                        <ProgressBar now={80} variant="success" className="subscription-progress" />
                      </div>
                    </div>
                    
                    <div className="payment-methods mb-5">
                      <h5 className="mb-3">Payment Methods</h5>
                      <div className="method-list">
                        <div className="payment-method active">
                          <div className="method-icon">💳</div>
                          <div className="method-info">
                            <h6>Visa •••• 4242</h6>
                            <p>Expires 05/2024</p>
                          </div>
                          <Button variant="outline-secondary" size="sm">
                            Edit
                          </Button>
                        </div>
                        <div className="payment-method">
                          <div className="method-icon">💳</div>
                          <div className="method-info">
                            <h6>Mastercard •••• 5555</h6>
                            <p>Expired</p>
                          </div>
                          <Button variant="outline-danger" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline-primary" className="mt-3">
                        + Add Payment Method
                      </Button>
                    </div>
                    
                    <div className="billing-history">
                      <h5 className="mb-3">Billing History</h5>
                      <div className="history-list">
                        {[
                          { date: 'May 15, 2023', amount: '$9.99', status: 'Paid' },
                          { date: 'Apr 15, 2023', amount: '$9.99', status: 'Paid' },
                          { date: 'Mar 15, 2023', amount: '$9.99', status: 'Refunded' }
                        ].map((item, index) => (
                          <div key={index} className="history-item">
                            <div className="history-date">{item.date}</div>
                            <div className="history-amount">{item.amount}</div>
                            <div className={`history-status ${item.status.toLowerCase()}`}>
                              {item.status}
                            </div>
                            <Button variant="link" size="sm">
                              Invoice
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              )}
              
              {activeTab === 'privacy' && (
                <Card className="settings-card">
                  <Card.Header className="settings-card-header">
                    <Globe size={20} className="me-2" />
                    <span>Privacy</span>
                  </Card.Header>
                  <Card.Body>
                    <div className="privacy-settings">
                      <h5 className="mb-4">Privacy Preferences</h5>
                      
                      <div className="privacy-item">
                        <div className="privacy-info">
                          <h6>Profile Visibility</h6>
                          <p>Who can see your profile and activity</p>
                        </div>
                        <Form.Select className="privacy-select">
                          <option>Public</option>
                          <option>Friends Only</option>
                          <option>Private</option>
                        </Form.Select>
                      </div>
                      
                      <div className="privacy-item">
                        <div className="privacy-info">
                          <h6>Activity Sharing</h6>
                          <p>Share your workouts and progress</p>
                        </div>
                        <Form.Check
                          type="switch"
                          defaultChecked
                          className="privacy-switch"
                        />
                      </div>
                      
                      <div className="privacy-item">
                        <div className="privacy-info">
                          <h6>Data Collection</h6>
                          <p>Allow us to collect anonymous usage data</p>
                        </div>
                        <Form.Check
                          type="switch"
                          defaultChecked
                          className="privacy-switch"
                        />
                      </div>
                      
                      <div className="privacy-item">
                        <div className="privacy-info">
                          <h6>Personalized Ads</h6>
                          <p>Show personalized advertisements</p>
                        </div>
                        <Form.Check
                          type="switch"
                          className="privacy-switch"
                        />
                      </div>
                    </div>
                    
                    <div className="data-management mt-5">
                      <h5 className="mb-3">Data Management</h5>
                      <div className="data-options">
                        <Button variant="outline-secondary" className="me-3">
                          Export Data
                        </Button>
                        <Button variant="outline-danger">
                          Delete Account
                        </Button>
                      </div>
                      <p className="text-muted mt-2">
                        Warning: Account deletion is permanent and cannot be undone.
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              )}
            </motion.div>
          </AnimatePresence>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;