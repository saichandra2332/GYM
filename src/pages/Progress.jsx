import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Table,
  Badge,
  Button,
  ListGroup,
  Alert,
  Breadcrumb,
  Carousel,
  Accordion,
  Spinner,
  Tabs,
  Tab,
  Modal,
  Form,
  OverlayTrigger,
  Tooltip,
  Dropdown,
  DropdownButton
} from 'react-bootstrap';
import {
  GraphUp,
  Trophy,
  Calendar,
  HeartPulse,
  Rulers,
  Plus,
  CheckCircle,
  ExclamationTriangle,
  InfoCircle
} from 'react-bootstrap-icons';
import Header from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import Footer from '../components/Footer';  

const Progress = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('fitness');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const fitnessGoals = [
    { id: 1, name: 'Bench Press', current: 120, target: 150, unit: 'kg', progress: 80 },
    { id: 2, name: 'Squat', current: 140, target: 180, unit: 'kg', progress: 65 },
    { id: 3, name: '5K Run', current: 28, target: 22, unit: 'min', progress: 45, reverse: true },
    { id: 4, name: 'Body Fat %', current: 18, target: 15, unit: '%', progress: 60, reverse: true }
  ];

  const measurements = [
    { date: '2023-05-01', weight: 78, chest: 102, waist: 86, arms: 35 },
    { date: '2023-06-01', weight: 76, chest: 103, waist: 84, arms: 36 },
    { date: '2023-07-01', weight: 75, chest: 104, waist: 82, arms: 36.5 },
    { date: '2023-08-01', weight: 74, chest: 105, waist: 81, arms: 37 }
  ];

  const achievements = [
    { id: 1, title: '30-Day Streak', date: '2023-07-15', icon: <Trophy className="text-warning" /> },
    { id: 2, title: 'New PR: Deadlift', date: '2023-07-10', icon: <HeartPulse className="text-danger" /> },
    { id: 3, title: '5K Completed', date: '2023-06-25', icon: <GraphUp className="text-success" /> }
  ];

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click to see detailed progress
    </Tooltip>
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      
      <div className="d-flex flex-grow-1">
        <LeftMenu />
        
        <Container fluid className="p-4 main-content">
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Progress Tracker</Breadcrumb.Item>
          </Breadcrumb>

          <Row className="mb-4">
            <Col>
              <h2 className="d-flex align-items-center">
                <GraphUp className="me-2" /> My Progress
              </h2>
            </Col>
            <Col className="d-flex justify-content-end">
              <DropdownButton variant="primary" title="Add New" className="me-2">
                <Dropdown.Item onClick={() => setShowModal(true)}>
                  <Plus className="me-2" /> Measurement
                </Dropdown.Item>
                <Dropdown.Item>
                  <Plus className="me-2" /> Goal
                </Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>

          {isLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading your progress data...</p>
            </div>
          ) : (
            <>
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-4"
              >
                <Tab eventKey="fitness" title="Fitness Goals">
                  <Row className="mb-4">
                    {fitnessGoals.map(goal => (
                      <Col key={goal.id} md={6} lg={3} className="mb-3">
                        <Card className="h-100 shadow-sm">
                          <Card.Body>
                            <div className="d-flex justify-content-between mb-2">
                              <h5 className="mb-0">{goal.name}</h5>
                              <Badge bg={goal.progress >= 75 ? 'success' : goal.progress >= 50 ? 'warning' : 'danger'}>
                                {goal.progress}%
                              </Badge>
                            </div>
                            <p className="text-muted mb-2">
                              {goal.current} {goal.unit} / {goal.target} {goal.unit}
                            </p>
                            <ProgressBar
                              variant={goal.progress >= 75 ? 'success' : goal.progress >= 50 ? 'warning' : 'danger'}
                              now={goal.progress}
                              className="mb-3"
                            />
                            <OverlayTrigger
                              placement="bottom"
                              overlay={renderTooltip}
                            >
                              <Button variant="outline-primary" size="sm" className="w-100">
                                View Details
                              </Button>
                            </OverlayTrigger>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>

                  <Card className="shadow-sm mb-4">
                    <Card.Header className="bg-primary text-white">
                      <h5 className="mb-0">Body Measurements</h5>
                    </Card.Header>
                    <Card.Body>
                      <div className="table-responsive">
                        <Table striped hover>
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Weight (kg)</th>
                              <th>Chest (cm)</th>
                              <th>Waist (cm)</th>
                              <th>Arms (cm)</th>
                              <th>Change</th>
                            </tr>
                          </thead>
                          <tbody>
                            {measurements.map((measurement, index) => (
                              <tr key={index}>
                                <td>{measurement.date}</td>
                                <td>{measurement.weight}</td>
                                <td>{measurement.chest}</td>
                                <td>{measurement.waist}</td>
                                <td>{measurement.arms}</td>
                                <td>
                                  {index > 0 && (
                                    <>
                                      {measurement.weight < measurements[index - 1].weight ? (
                                        <Badge bg="success">↓ {measurements[index - 1].weight - measurement.weight}kg</Badge>
                                      ) : measurement.weight > measurements[index - 1].weight ? (
                                        <Badge bg="danger">↑ {measurement.weight - measurements[index - 1].weight}kg</Badge>
                                      ) : (
                                        <Badge bg="secondary">No change</Badge>
                                      )}
                                    </>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab>
                <Tab eventKey="achievements" title="Achievements">
                  <Row>
                    {achievements.map(achievement => (
                      <Col key={achievement.id} md={4} className="mb-4">
                        <Card className="h-100 shadow-sm">
                          <Card.Body className="text-center">
                            <div className="mb-3" style={{ fontSize: '2rem' }}>
                              {achievement.icon}
                            </div>
                            <h5>{achievement.title}</h5>
                            <p className="text-muted">
                              <Calendar className="me-2" />
                              {achievement.date}
                            </p>
                            <Button variant="outline-primary" size="sm">
                              Share
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>

                  <Alert variant="info" className="d-flex align-items-center">
                    <InfoCircle className="me-2" size={24} />
                    <div>
                      <strong>Keep going!</strong> You're on track to unlock your next achievement.
                    </div>
                  </Alert>
                </Tab>
              </Tabs>

              <Row>
                <Col md={6}>
                  <Card className="shadow-sm mb-4">
                    <Card.Header>
                      <h5 className="mb-0">Progress Chart</h5>
                    </Card.Header>
                    <Card.Body>
                      <div className="text-center py-4 bg-light rounded">
                        <p className="text-muted">Weight Loss Progress (Last 3 Months)</p>
                        <img 
  src="https://quickchart.io/chart?c={type:'line',data:{labels:['Jan','Feb','Mar','Apr','May','Jun'], datasets:[{label:'Weight (kg)',data:[78,76,75,74,73,74]}]}}" 
  alt="Progress chart" 
  className="img-fluid"
/>
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        <Button variant="outline-secondary" size="sm">
                          Weekly
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                          Monthly
                        </Button>
                        <Button variant="primary" size="sm">
                          Yearly
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="shadow-sm mb-4">
                    <Card.Header>
                      <h5 className="mb-0">Recent Activities</h5>
                    </Card.Header>
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="d-flex align-items-center">
                          <CheckCircle className="text-success me-3" />
                          <div>
                            <h6 className="mb-0">Workout Completed</h6>
                            <small className="text-muted">Chest & Triceps - 45 min</small>
                          </div>
                          <Badge bg="light" text="dark" className="ms-auto">
                            2h ago
                          </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex align-items-center">
                          <ExclamationTriangle className="text-warning me-3" />
                          <div>
                            <h6 className="mb-0">Missed Workout</h6>
                            <small className="text-muted">Leg Day</small>
                          </div>
                          <Badge bg="light" text="dark" className="ms-auto">
                            Yesterday
                          </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex align-items-center">
                          <CheckCircle className="text-success me-3" />
                          <div>
                            <h6 className="mb-0">New Measurement</h6>
                            <small className="text-muted">Weight: 74kg (-1kg)</small>
                          </div>
                          <Badge bg="light" text="dark" className="ms-auto">
                            3 days ago
                          </Badge>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Measurement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="measurementDate" className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="weight">
                      <Form.Label>Weight (kg)</Form.Label>
                      <Form.Control type="number" placeholder="75.5" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="bodyFat">
                      <Form.Label>Body Fat %</Form.Label>
                      <Form.Control type="number" placeholder="18.5" />
                    </Form.Group>
                  </Col>
                </Row>
                <h6 className="mb-3">Body Measurements (cm)</h6>
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group controlId="chest">
                      <Form.Label>Chest</Form.Label>
                      <Form.Control type="number" placeholder="102" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="waist">
                      <Form.Label>Waist</Form.Label>
                      <Form.Control type="number" placeholder="86" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="arms">
                      <Form.Label>Arms</Form.Label>
                      <Form.Control type="number" placeholder="35" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="notes" className="mb-3">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control as="textarea" rows={2} placeholder="Any additional notes..." />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setShowModal(false)}>
                Save Measurement
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
      
      <Footer />
    </div>
  );
};

export default Progress;