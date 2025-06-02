import React from 'react';
import { Table, Card, Badge, Button, Stack, Form, InputGroup } from 'react-bootstrap';
import { motion } from 'framer-motion';
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
  FaFilter
} from 'react-icons/fa';

const membersData = [
  { id: 1, name: 'Pavan Kumar', membership: 'Premium', joinDate: '2023-01-15', active: true, email: 'john@example.com', phone: '555-1234' },
  { id: 2, name: 'Sai Chandra', membership: 'Standard', joinDate: '2023-02-20', active: true, email: 'jane@example.com', phone: '555-5678' },
  { id: 3, name: 'Anandh', membership: 'Premium', joinDate: '2023-03-10', active: true, email: 'mike@example.com', phone: '555-9012' },
  { id: 4, name: 'Santosh', membership: 'Basic', joinDate: '2023-04-05', active: false, email: 'sarah@example.com', phone: '555-3456' },
];

const MembershipBadge = ({ type }) => {
  switch (type) {
    case 'Premium':
      return <Badge pill bg="warning" className="d-flex align-items-center"><FaCrown className="me-1" /> {type}</Badge>;
    case 'Standard':
      return <Badge pill bg="primary" className="d-flex align-items-center"><FaStar className="me-1" /> {type}</Badge>;
    default:
      return <Badge pill bg="secondary" className="d-flex align-items-center"><FaRegStar className="me-1" /> {type}</Badge>;
  }
};

const AnimatedTableRow = styled(motion.tr)`
  &:hover {
    background-color: rgba(0, 123, 255, 0.1) !important;
  }
`;

const StatusIndicator = ({ active }) => (
  <span className={`d-inline-block rounded-circle ${active ? 'bg-success' : 'bg-danger'}`} 
        style={{ width: '12px', height: '12px' }} />
);

const MemberCard = ({ member }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="member-card mb-3"
    whileHover={{ scale: 1.01 }}
  >
    <Card className="shadow-sm h-100">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h5 className="mb-1">{member.name}</h5>
            <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
              <MembershipBadge type={member.membership} />
              <span className="d-flex align-items-center gap-1">
                <StatusIndicator active={member.active} />
                <small>{member.active ? 'Active' : 'Inactive'}</small>
              </span>
            </div>
          </div>
          <Button variant="link" size="sm" className="p-0">
            <FaEllipsisV />
          </Button>
        </div>

        <div className="member-details flex-grow-1">
          <div className="mb-2">
            <small className="text-muted d-block">Member ID</small>
            <span>#{member.id}</span>
          </div>
          
          <div className="mb-2">
            <small className="text-muted d-block">Join Date</small>
            <span>
              {new Date(member.joinDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>

        <Stack direction="horizontal" gap={2} className="mt-3 flex-wrap">
          <Button variant="outline-primary" size="sm" className="d-flex align-items-center gap-1 flex-grow">
            <FaPhone size={12} /> Call
          </Button>
          <Button variant="outline-success" size="sm" className="d-flex align-items-center gap-1 flex-grow">
            <FaEnvelope size={12} /> Email
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  </motion.div>
);

function Members() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState('All');
  
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
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const filteredMembers = membersData.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || member.membership === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-3"
    >
      <Card className="shadow-lg border-0 h-100">
        <Card.Header className="bg-dark text-white">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
            <div className="d-flex align-items-center">
              <FaDumbbell className="me-2" />
              <h2 className="mb-0">Gym Members</h2>
            </div>
            <Badge pill bg="light" text="dark" className="fs-6">
              {filteredMembers.length} {filteredMembers.length === 1 ? 'Member' : 'Members'}
            </Badge>
          </div>

          <div className="d-flex flex-column flex-md-row gap-3 mt-3">
            <InputGroup className="flex-grow-1">
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="flex-grow-1">
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
          </div>
        </Card.Header>
        
        <Card.Body className="p-0">
          {/* Desktop Table View */}
          <div className="table-responsive d-none d-lg-block">
            <Table hover className="mb-0">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Membership</th>
                  <th>Join Date</th>
                  <th>Status</th>
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
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <td className="fw-bold">#{member.id}</td>
                    <td>{member.name}</td>
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
                      <Stack direction="horizontal" gap={2}>
                        <Button variant="outline-primary" size="sm" className="d-flex align-items-center gap-1">
                          <FaPhone sizesize={12} /> Call
                        </Button>
                        <Button variant="outline-success" size="sm" className="d-flex align-items-center gap-1">
                          <FaEnvelope size={12} /> Email
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
              <div className="text-center py-5">
                <h5>No members found</h5>
                <p className="text-muted">Try adjusting your search or filter</p>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="row row-cols-1 row-cols-md-2 g-3"
              >
                {filteredMembers.map((member) => (
                  <div key={member.id} className="col">
                    <MemberCard member={member} />
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </Card.Body>
        
        <Card.Footer className="text-muted">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
            <small>Last updated: {new Date().toLocaleString()}</small>
            <small className="text-warning fw-bold d-flex align-items-center">
              <FaCrown className="me-1" /> Premium members get exclusive benefits!
            </small>
          </div>
        </Card.Footer>
      </Card>
    </motion.div>
  );
}

export default Members;