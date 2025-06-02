import React from 'react';
import { Table, Card, Badge, Button, Stack, Form, InputGroup, ProgressBar, Modal } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { 
  FaDumbbell, 
  FaCrown, 
  FaStar, 
  FaRegStar, 
  FaPhone, 
  FaEnvelope,
  FaEllipsisV,
  FaSearch,
  FaFilter,
  FaUserAlt,
  FaCalendarAlt,
  FaChartLine,
  FaDumbbell as FaWorkout,
  FaWeight,
  FaHeartbeat,
  FaRunning,
  FaSwimmer,
  FaInfoCircle,
  FaTimes
} from 'react-icons/fa';

const membersData = [
  { 
    id: 1, 
    name: 'Pavan Kumar', 
    membership: 'Premium', 
    joinDate: '2023-01-15', 
    active: true, 
    email: 'pavan@example.com', 
    phone: '555-1234',
    workouts: 42,
    goals: ['Weight Loss', 'Strength Training'],
    height: "5'11\"",
    weight: '185 lbs',
    favoriteActivities: ['Weightlifting', 'Yoga'],
    lastWorkout: '2023-06-10',
    progress: 78,
    photo: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  { 
    id: 2, 
    name: 'Sai Chandra', 
    membership: 'Standard', 
    joinDate: '2023-02-20', 
    active: true, 
    email: 'sai@example.com', 
    phone: '555-5678',
    workouts: 28,
    goals: ['Endurance', 'Flexibility'],
    height: "5'8\"",
    weight: '150 lbs',
    favoriteActivities: ['Running', 'Swimming'],
    lastWorkout: '2023-06-12',
    progress: 65,
    photo: 'https://randomuser.me/api/portraits/men/44.jpg'
  },
  { 
    id: 3, 
    name: 'Anandh', 
    membership: 'Premium', 
    joinDate: '2023-03-10', 
    active: true, 
    email: 'anandh@example.com', 
    phone: '555-9012',
    workouts: 56,
    goals: ['Muscle Gain', 'Powerlifting'],
    height: "6'2\"",
    weight: '210 lbs',
    favoriteActivities: ['Powerlifting', 'CrossFit'],
    lastWorkout: '2023-06-11',
    progress: 92,
    photo: 'https://randomuser.me/api/portraits/men/67.jpg'
  },
  { 
    id: 4, 
    name: 'Santosh', 
    membership: 'Basic', 
    joinDate: '2023-04-05', 
    active: false, 
    email: 'santosh@example.com', 
    phone: '555-3456',
    workouts: 12,
    goals: ['General Fitness'],
    height: "5'9\"",
    weight: '170 lbs',
    favoriteActivities: ['Cardio', 'Pilates'],
    lastWorkout: '2023-05-28',
    progress: 35,
    photo: 'https://randomuser.me/api/portraits/men/22.jpg'
  },
  { 
    id: 5, 
    name: 'Priya Sharma', 
    membership: 'Premium', 
    joinDate: '2023-01-22', 
    active: true, 
    email: 'priya@example.com', 
    phone: '555-7890',
    workouts: 63,
    goals: ['Body Toning', 'Flexibility'],
    height: "5'6\"",
    weight: '135 lbs',
    favoriteActivities: ['Yoga', 'Pilates'],
    lastWorkout: '2023-06-12',
    progress: 88,
    photo: 'https://randomuser.me/api/portraits/women/45.jpg'
  },
  { 
    id: 6, 
    name: 'Rahul Verma', 
    membership: 'Standard', 
    joinDate: '2023-05-15', 
    active: true, 
    email: 'rahul@example.com', 
    phone: '555-2345',
    workouts: 18,
    goals: ['Weight Loss', 'Cardio'],
    height: "5'10\"",
    weight: '195 lbs',
    favoriteActivities: ['Cycling', 'Swimming'],
    lastWorkout: '2023-06-09',
    progress: 42,
    photo: 'https://randomuser.me/api/portraits/men/75.jpg'
  },
];

const MembershipBadge = ({ type }) => {
  switch (type) {
    case 'Premium':
      return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Badge pill bg="warning" text="dark" className="d-flex align-items-center">
            <FaCrown className="me-1" /> {type}
          </Badge>
        </motion.div>
      );
    case 'Standard':
      return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Badge pill bg="primary" className="d-flex align-items-center">
            <FaStar className="me-1" /> {type}
          </Badge>
        </motion.div>
      );
    default:
      return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Badge pill bg="secondary" className="d-flex align-items-center">
            <FaRegStar className="me-1" /> {type}
          </Badge>
        </motion.div>
      );
  }
};

const AnimatedTableRow = styled(motion.tr)`
  &:hover {
    background-color: rgba(0, 123, 255, 0.1) !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const StatusIndicator = ({ active }) => (
  <motion.span 
    className={`d-inline-block rounded-circle ${active ? 'bg-success' : 'bg-danger'}`}
    style={{ width: '12px', height: '12px' }}
    animate={{ 
      scale: [1, 1.2, 1],
      opacity: [0.8, 1, 0.8]
    }}
    transition={{ 
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

const MemberAvatar = ({ src, name }) => (
  <motion.div 
    className="rounded-circle overflow-hidden"
    style={{ width: '40px', height: '40px' }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    {src ? (
      <img 
        src={src} 
        alt={name} 
        className="w-100 h-100 object-fit-cover"
      />
    ) : (
      <div className="w-100 h-100 bg-secondary d-flex align-items-center justify-content-center">
        <FaUserAlt className="text-white" />
      </div>
    )}
  </motion.div>
);

const ProgressIndicator = ({ progress }) => (
  <motion.div 
    initial={{ width: 0 }}
    animate={{ width: `${progress}%` }}
    transition={{ duration: 1, delay: 0.3 }}
  >
    <ProgressBar 
      now={progress} 
      label={`${progress}%`} 
      variant={progress > 75 ? 'success' : progress > 50 ? 'primary' : 'warning'}
      striped 
      animated 
    />
  </motion.div>
);

const ActivityBadge = ({ activity }) => {
  const icons = {
    'Weightlifting': <FaWeight className="me-1" />,
    'Yoga': <FaHeartbeat className="me-1" />,
    'Running': <FaRunning className="me-1" />,
    'Swimming': <FaSwimmer className="me-1" />,
    'Powerlifting': <FaWeight className="me-1" />,
    'CrossFit': <FaDumbbell className="me-1" />,
    'Cardio': <FaRunning className="me-1" />,
    'Pilates': <FaHeartbeat className="me-1" />
  };
  
  return (
    <motion.div whileHover={{ y: -2 }}>
      <Badge pill bg="light" text="dark" className="d-flex align-items-center me-1 mb-1">
        {icons[activity] || <FaWorkout className="me-1" />}
        {activity}
      </Badge>
    </motion.div>
  );
};

const MemberCard = ({ member, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    className="member-card mb-3"
    whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    layout
  >
    <Card className="shadow-sm h-100 border-0">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex align-items-center">
            <MemberAvatar src={member.photo} name={member.name} />
            <div className="ms-3">
              <h5 className="mb-1">{member.name}</h5>
              <div className="d-flex align-items-center flex-wrap gap-2">
                <MembershipBadge type={member.membership} />
                <span className="d-flex align-items-center gap-1">
                  <StatusIndicator active={member.active} />
                  <small>{member.active ? 'Active' : 'Inactive'}</small>
                </span>
              </div>
            </div>
          </div>
          <Button variant="link" size="sm" className="p-0">
            <FaEllipsisV />
          </Button>
        </div>

        <div className="member-details flex-grow-1">
          <div className="mb-3">
            <small className="text-muted d-block">Progress</small>
            <ProgressIndicator progress={member.progress} />
          </div>
          
          <div className="mb-3">
            <small className="text-muted d-block">Workouts Completed</small>
            <div className="d-flex align-items-center">
              <FaWorkout className="me-2 text-primary" />
              <span>{member.workouts}</span>
              <small className="text-muted ms-2">
                Last: {new Date(member.lastWorkout).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </small>
            </div>
          </div>
          
          <div className="mb-3">
            <small className="text-muted d-block">Favorite Activities</small>
            <div className="d-flex flex-wrap">
              {member.favoriteActivities.map(activity => (
                <ActivityBadge key={activity} activity={activity} />
              ))}
            </div>
          </div>
        </div>

        <Stack direction="horizontal" gap={2} className="mt-auto">
          <Button 
            variant="outline-primary" 
            size="sm" 
            className="d-flex align-items-center gap-1 flex-grow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPhone size={12} /> Call
          </Button>
          <Button 
            variant="outline-success" 
            size="sm" 
            className="d-flex align-items-center gap-1 flex-grow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope size={12} /> Email
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  </motion.div>
);

const MemberDetailModal = ({ member, show, onHide }) => {
  if (!member) return null;
  
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="d-flex align-items-center">
            <MemberAvatar src={member.photo} name={member.name} className="me-3" />
            <div>
              <h4 className="mb-0">{member.name}</h4>
              <div className="d-flex align-items-center gap-2">
                <MembershipBadge type={member.membership} />
                <StatusIndicator active={member.active} />
                <small>{member.active ? 'Active' : 'Inactive'}</small>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <h5 className="d-flex align-items-center gap-2 mb-3">
                <FaInfoCircle className="text-primary" /> Basic Info
              </h5>
              <div className="mb-3">
                <small className="text-muted d-block">Member ID</small>
                <span>#{member.id}</span>
              </div>
              <div className="mb-3">
                <small className="text-muted d-block">Join Date</small>
                <span>
                  <FaCalendarAlt className="me-2 text-muted" />
                  {new Date(member.joinDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="mb-3">
                <small className="text-muted d-block">Contact</small>
                <div>
                  <FaPhone className="me-2 text-muted" />
                  <a href={`tel:${member.phone}`}>{member.phone}</a>
                </div>
                <div>
                  <FaEnvelope className="me-2 text-muted" />
                  <a href={`mailto:${member.email}`}>{member.email}</a>
                </div>
              </div>
              <div className="mb-3">
                <small className="text-muted d-block">Body Stats</small>
                <div className="d-flex gap-3">
                  <div>
                    <FaWeight className="me-2 text-muted" />
                    {member.weight}
                  </div>
                  <div>
                    <FaUserAlt className="me-2 text-muted" />
                    {member.height}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <h5 className="d-flex align-items-center gap-2 mb-3">
                <FaChartLine className="text-success" /> Progress
              </h5>
              <div className="mb-3">
                <small className="text-muted d-block">Goal Completion</small>
                <ProgressIndicator progress={member.progress} />
              </div>
              
              <div className="mb-3">
                <small className="text-muted d-block">Workout Stats</small>
                <div className="d-flex justify-content-between">
                  <div className="text-center">
                    <div className="fs-4 fw-bold">{member.workouts}</div>
                    <small className="text-muted">Total</small>
                  </div>
                  <div className="text-center">
                    <div className="fs-4 fw-bold">
                      {Math.round(member.workouts / ((new Date() - new Date(member.joinDate)) / (1000 * 60 * 60 * 24 * 7)) * 10) / 10}
                    </div>
                    <small className="text-muted">Per week</small>
                  </div>
                  <div className="text-center">
                    <div className="fs-4 fw-bold">
                      {new Date(member.lastWorkout).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <small className="text-muted">Last workout</small>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <small className="text-muted d-block">Fitness Goals</small>
                <div className="d-flex flex-wrap gap-2">
                  {member.goals.map(goal => (
                    <Badge key={goal} pill bg="info" className="d-flex align-items-center">
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mb-3">
                <small className="text-muted d-block">Favorite Activities</small>
                <div className="d-flex flex-wrap gap-2">
                  {member.favoriteActivities.map(activity => (
                    <Badge key={activity} pill bg="light" text="dark" className="d-flex align-items-center">
                      {activity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary">
            <FaEnvelope className="me-2" /> Send Workout Plan
          </Button>
        </Modal.Footer>
      </motion.div>
    </Modal>
  );
};

function Members() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState('All');
  const [sortBy, setSortBy] = React.useState('joinDate');
  const [sortDirection, setSortDirection] = React.useState('desc');
  const [selectedMember, setSelectedMember] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const filteredMembers = membersData
    .filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.phone.includes(searchTerm);
      const matchesFilter = filter === 'All' || member.membership === filter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'joinDate') {
        return sortDirection === 'asc' 
          ? new Date(a.joinDate) - new Date(b.joinDate) 
          : new Date(b.joinDate) - new Date(a.joinDate);
      } else if (sortBy === 'workouts') {
        return sortDirection === 'asc' 
          ? a.workouts - b.workouts 
          : b.workouts - a.workouts;
      }
      return 0;
    });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const openMemberDetail = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const SortIndicator = ({ column }) => (
    <motion.span 
      className="ms-1"
      animate={{ 
        rotate: sortBy === column && sortDirection === 'desc' ? 180 : 0,
        opacity: sortBy === column ? 1 : 0.5
      }}
      transition={{ duration: 0.2 }}
    >
      {sortBy === column && sortDirection === 'asc' ? '↑' : '↓'}
    </motion.span>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-3"
    >
      <Card className="shadow-lg border-0 h-100 overflow-hidden">
        <Card.Header className="bg-dark text-white position-relative">
          <div className="position-absolute top-0 end-0 w-100 h-100 overflow-hidden">
            <motion.div 
              className="position-absolute"
              style={{
                top: '-50%',
                right: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, rgba(255,215,0,0) 70%)'
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          </div>
          
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 position-relative">
            <div className="d-flex align-items-center">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              >
                <FaDumbbell className="me-2" />
              </motion.div>
              <h2 className="mb-0">Gym Members</h2>
            </div>
            <Badge pill bg="light" text="dark" className="fs-6">
              {filteredMembers.length} {filteredMembers.length === 1 ? 'Member' : 'Members'}
            </Badge>
          </div>

          <div className="d-flex flex-column flex-md-row gap-3 mt-3 position-relative">
            <InputGroup className="flex-grow-1">
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setSearchTerm('')}
                >
                  <FaTimes />
                </Button>
              )}
            </InputGroup>

            <Stack direction="horizontal" gap={3} className="flex-grow-1">
              <InputGroup>
                <InputGroup.Text>
                  <FaFilter />
                </InputGroup.Text>
                <Form.Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="All">All Memberships</option>
                  <option value="Premium">Premium</option>
                  <option value="Standard">Standard</option>
                  <option value="Basic">Basic</option>
                </Form.Select>
              </InputGroup>
              
              <InputGroup>
                <InputGroup.Text>
                  <FaChartLine />
                </InputGroup.Text>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="joinDate">Sort by Join Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="workouts">Sort by Workouts</option>
                </Form.Select>
              </InputGroup>
            </Stack>
          </div>
        </Card.Header>
        
        <Card.Body className="p-0 position-relative">
          {/* Stats Overview */}
          <motion.div 
            className="p-3 bg-light d-flex flex-wrap justify-content-around gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center">
              <div className="fs-3 fw-bold">
                {membersData.filter(m => m.membership === 'Premium').length}
              </div>
              <small className="text-muted">Premium Members</small>
            </div>
            <div className="text-center">
              <div className="fs-3 fw-bold">
                {membersData.reduce((sum, m) => sum + m.workouts, 0)}
              </div>
              <small className="text-muted">Total Workouts</small>
            </div>
            <div className="text-center">
              <div className="fs-3 fw-bold">
                {Math.round(membersData.reduce((sum, m) => sum + m.progress, 0) / membersData.length)}%
              </div>
              <small className="text-muted">Avg. Progress</small>
            </div>
            <div className="text-center">
              <div className="fs-3 fw-bold">
                {membersData.filter(m => m.active).length}
              </div>
              <small className="text-muted">Active Members</small>
            </div>
          </motion.div>
          
          {/* Desktop Table View */}
          <div className="table-responsive d-none d-lg-block">
            <Table hover className="mb-0">
              <thead className="table-dark">
                <tr>
                  <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                    Name <SortIndicator column="name" />
                  </th>
                  <th>Photo</th>
                  <th>Membership</th>
                  <th onClick={() => handleSort('joinDate')} style={{ cursor: 'pointer' }}>
                    Join Date <SortIndicator column="joinDate" />
                  </th>
                  <th>Status</th>
                  <th onClick={() => handleSort('workouts')} style={{ cursor: 'pointer' }}>
                    Workouts <SortIndicator column="workouts" />
                  </th>
                  <th>Progress</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <motion.tbody
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredMembers.map((member) => (
                  <AnimatedTableRow
                    key={member.id}
                    variants={rowVariants}
                    whileHover={{ 
                      scale: 1.005,
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                    }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => openMemberDetail(member)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="fw-bold">{member.name}</td>
                    <td>
                      <MemberAvatar src={member.photo} name={member.name} />
                    </td>
                    <td><MembershipBadge type={member.membership} /></td>
                    <td>{new Date(member.joinDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</td>
                    <td className="d-flex align-items-center gap-2">
                      <StatusIndicator active={member.active} />
                      {member.active ? 'Active' : 'Inactive'}
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <FaWorkout className="text-primary" />
                        {member.workouts}
                      </div>
                    </td>
                    <td>
                      <div style={{ width: '100px' }}>
                        <ProgressBar 
                          now={member.progress} 
                          label={`${member.progress}%`} 
                          variant={member.progress > 75 ? 'success' : member.progress > 50 ? 'primary' : 'warning'}
                          striped 
                        />
                      </div>
                    </td>
                    <td>
                      <Stack direction="horizontal" gap={2}>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="d-flex align-items-center gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `tel:${member.phone}`;
                          }}
                        >
                          <FaPhone size={12} />
                        </Button>
                        <Button 
                          variant="outline-success" 
                          size="sm" 
                          className="d-flex align-items-center gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `mailto:${member.email}`;
                          }}
                        >
                          <FaEnvelope size={12} />
                        </Button>
                      </Stack>
                    </td>
                  </AnimatedTableRow>
                ))}
              </motion.tbody>
            </Table>
          </div>

          {/* Tablet/Mobile Card View */}
          <div className="d-lg-none p-3">
            {filteredMembers.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-5"
              >
                <h5>No members found</h5>
                <p className="text-muted">Try adjusting your search or filter</p>
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  <FaSearch size={48} className="text-muted mt-3" />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="row row-cols-1 row-cols-md-2 g-3"
              >
                <AnimatePresence>
                  {filteredMembers.map((member) => (
                    <motion.div 
                      key={member.id} 
                      className="col"
                      variants={rowVariants}
                      layout
                    >
                      <MemberCard 
                        member={member} 
                        onClick={() => openMemberDetail(member)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </Card.Body>
        
        <Card.Footer className="text-muted">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
            <small>Last updated: {new Date().toLocaleString()}</small>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <small className="text-warning fw-bold d-flex align-items-center">
                <FaCrown className="me-1" /> Premium members get exclusive benefits!
              </small>
            </motion.div>
          </div>
        </Card.Footer>
      </Card>
      
      <MemberDetailModal 
        member={selectedMember} 
        show={showModal} 
        onHide={() => setShowModal(false)} 
      />
    </motion.div>
  );
}

export default Members;