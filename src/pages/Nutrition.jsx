import React from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Table, 
  ProgressBar, 
  Badge,
  Form,
  Button,
  ListGroup,
  Alert,
  Breadcrumb,
  Carousel,
  Accordion,
  Spinner,
  Toast,
  Modal,
  Tab,
  Tabs,
  Tooltip,
  OverlayTrigger,
  Popover
} from 'react-bootstrap';
import { 
  EggFried, 
  Apple, 
  CupHot, 
  Basket, 
  PlusCircle,
  Clock,
  CheckCircle,
  ExclamationTriangle
} from 'react-bootstrap-icons';
import Header from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import Footer from '../components/Footer';

const Nutrition = () => {
  const [showMealModal, setShowMealModal] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('today');
  const [showToast, setShowToast] = React.useState(true);

  const todayMeals = [
    { id: 1, name: 'Oatmeal with fruits', time: '08:00 AM', calories: 350, protein: 12, carbs: 55, fats: 8, type: 'Breakfast' },
    { id: 2, name: 'Grilled Chicken Salad', time: '12:30 PM', calories: 450, protein: 35, carbs: 20, fats: 15, type: 'Lunch' },
    { id: 3, name: 'Protein Shake', time: '04:00 PM', calories: 220, protein: 25, carbs: 15, fats: 5, type: 'Snack' }
  ];

  const weeklyProgress = [
    { day: 'Mon', calories: 1800, goal: 2200 },
    { day: 'Tue', calories: 1950, goal: 2200 },
    { day: 'Wed', calories: 2100, goal: 2200 },
    { day: 'Thu', calories: 2300, goal: 2200 },
    { day: 'Fri', calories: 2000, goal: 2200 },
    { day: 'Sat', calories: 2500, goal: 2500 },
    { day: 'Sun', calories: 1800, goal: 2200 }
  ];

  const popularFoods = [
    { name: 'Greek Yogurt', calories: 150, icon: <EggFried className="text-primary" /> },
    { name: 'Almonds', calories: 160, icon: <Apple className="text-success" /> },
    { name: 'Grilled Salmon', calories: 280, icon: <EggFried className="text-info" /> },
    { name: 'Quinoa', calories: 220, icon: <Basket className="text-warning" /> }
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      
      <div className="d-flex flex-grow-1">
        <LeftMenu />
        
        <Container fluid className="p-4 main-content">
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Nutrition</Breadcrumb.Item>
          </Breadcrumb>

          <Row className="mb-4">
            <Col>
              <h2 className="d-flex align-items-center">
                <EggFried className="me-2" /> Nutrition Tracker
              </h2>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button variant="success" onClick={() => setShowMealModal(true)}>
                <PlusCircle className="me-2" /> Add Meal
              </Button>
            </Col>
          </Row>

          {showToast && (
            <Alert variant="info" className="d-flex align-items-center" onClose={() => setShowToast(false)} dismissible>
              <ExclamationTriangle className="me-2" />
              <div>
                <strong>Tip:</strong> Track your meals regularly for better insights!
              </div>
            </Alert>
          )}

          <Row className="mb-4">
            <Col md={8}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    className="mb-3"
                  >
                    <Tab eventKey="today" title="Today's Meals">
                      <Table striped hover responsive>
                        <thead>
                          <tr>
                            <th>Meal</th>
                            <th>Time</th>
                            <th>Calories</th>
                            <th>Macros</th>
                            <th>Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {todayMeals.map(meal => (
                            <tr key={meal.id}>
                              <td>{meal.name}</td>
                              <td>
                                <Clock className="me-1" />
                                {meal.time}
                              </td>
                              <td>{meal.calories} kcal</td>
                              <td>
                                <div className="d-flex">
                                  <Badge bg="primary" className="me-1">P: {meal.protein}g</Badge>
                                  <Badge bg="success" className="me-1">C: {meal.carbs}g</Badge>
                                  <Badge bg="warning" text="dark">F: {meal.fats}g</Badge>
                                </div>
                              </td>
                              <td>
                                <Badge bg={meal.type === 'Breakfast' ? 'info' : meal.type === 'Lunch' ? 'success' : 'secondary'}>
                                  {meal.type}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Tab>
                    <Tab eventKey="week" title="Weekly Progress">
                      <div className="table-responsive">
                        <Table striped hover>
                          <thead>
                            <tr>
                              <th>Day</th>
                              <th>Calories</th>
                              <th>Progress</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {weeklyProgress.map((day, index) => (
                              <tr key={index}>
                                <td>{day.day}</td>
                                <td>{day.calories} / {day.goal}</td>
                                <td>
                                  <ProgressBar 
                                    variant={day.calories > day.goal ? 'danger' : 'success'}
                                    now={(day.calories / day.goal) * 100} 
                                  />
                                </td>
                                <td>
                                  {day.calories <= day.goal ? (
                                    <CheckCircle className="text-success" />
                                  ) : (
                                    <ExclamationTriangle className="text-danger" />
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Tab>
                  </Tabs>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm mb-4">
                <Card.Header className="bg-primary text-white">
                  <h5 className="mb-0">Daily Summary</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <span>Calories</span>
                      <Badge bg="primary" pill>1,020 / 2,200</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <span>Protein</span>
                      <Badge bg="success" pill>72g</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <span>Carbs</span>
                      <Badge bg="warning" text="dark" pill>90g</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <span>Fats</span>
                      <Badge bg="danger" pill>28g</Badge>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>

              <Card className="shadow-sm">
                <Card.Header className="bg-success text-white">
                  <h5 className="mb-0">Popular Foods</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup>
                    {popularFoods.map((food, index) => (
                      <ListGroup.Item key={index} className="d-flex align-items-center">
                        <div className="me-3">{food.icon}</div>
                        <div className="flex-grow-1">
                          <h6 className="mb-0">{food.name}</h6>
                          <small className="text-muted">{food.calories} kcal per serving</small>
                        </div>
                        <Button variant="outline-primary" size="sm">+ Add</Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card className="shadow-sm mb-4">
                <Card.Header>
                  <h5 className="mb-0">Water Intake</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3">
                      <CupHot size={32} className="text-info" />
                    </div>
                    <div className="flex-grow-1">
                      <h4 className="mb-0">4.2 / 8 glasses</h4>
                      <ProgressBar variant="info" now={52.5} className="mt-2" />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(glass => (
                      <Button 
                        key={glass} 
                        variant={glass <= 4 ? 'info' : 'outline-info'} 
                        size="sm"
                        className="rounded-circle"
                      >
                        {glass}
                      </Button>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="shadow-sm mb-4">
                <Card.Header>
                  <h5 className="mb-0">Nutrition Tips</h5>
                </Card.Header>
                <Card.Body>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Stay Hydrated</Accordion.Header>
                      <Accordion.Body>
                        Drinking enough water is crucial for metabolism and overall health. Aim for at least 8 glasses per day.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Protein Intake</Accordion.Header>
                      <Accordion.Body>
                        Consume 1.6-2.2 grams of protein per kilogram of body weight if you're training regularly.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Modal show={showMealModal} onHide={() => setShowMealModal(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Add New Meal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="mealName">
                      <Form.Label>Meal Name</Form.Label>
                      <Form.Control type="text" placeholder="e.g., Grilled Chicken Salad" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="mealType">
                      <Form.Label>Meal Type</Form.Label>
                      <Form.Select>
                        <option>Breakfast</option>
                        <option>Lunch</option>
                        <option>Dinner</option>
                        <option>Snack</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group controlId="calories">
                      <Form.Label>Calories (kcal)</Form.Label>
                      <Form.Control type="number" placeholder="350" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="protein">
                      <Form.Label>Protein (g)</Form.Label>
                      <Form.Control type="number" placeholder="30" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="carbs">
                      <Form.Label>Carbs (g)</Form.Label>
                      <Form.Control type="number" placeholder="40" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="mealNotes" className="mb-3">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Any additional notes about this meal..." />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowMealModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setShowMealModal(false)}>
                Save Meal
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
      
      <Footer />
    </div>
  );
};

export default Nutrition;