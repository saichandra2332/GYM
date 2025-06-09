import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

const trainers = [
  {
    id: 1,
    name: "Alex Johnson",
    specialty: "Strength Training",
    experience: "8 years",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.9,
    available: true
  },
  {
    id: 2,
    name: "Sarah Williams",
    specialty: "Yoga & Flexibility",
    experience: "6 years",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.8,
    available: true
  },
  {
    id: 3,
    name: "Mike Chen",
    specialty: "CrossFit",
    experience: "10 years",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5.0,
    available: false
  },
  {
    id: 4,
    name: "Emma Davis",
    specialty: "Weight Loss",
    experience: "5 years",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.7,
    available: true
  },
  {
    id: 5,
    name: "James Wilson",
    specialty: "Bodybuilding",
    experience: "12 years",
    image: "https://randomuser.me/api/portraits/men/81.jpg",
    rating: 4.9,
    available: true
  },
  {
    id: 6,
    name: "Lisa Brown",
    specialty: "Pilates",
    experience: "7 years",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    rating: 4.6,
    available: false
  }
];

function Trainers() {
  return (
    <Container fluid className="py-4 px-lg-5">
      <h2 className="text-center mb-5">
        <span className="border-bottom border-3 border-primary pb-2">Our Professional Trainers</span>
      </h2>
      
      <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
        {trainers.map((trainer) => (
          <Col key={trainer.id}>
            <Card className="h-100 shadow-sm border-0 hover-shadow transition-all">
              <div className="position-relative">
                <Card.Img 
                  variant="top" 
                  src={trainer.image} 
                  className="img-fluid"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <Badge 
                  pill 
                  bg={trainer.available ? "success" : "secondary"}
                  className="position-absolute top-0 end-0 m-2"
                >
                  {trainer.available ? "Available" : "Booked"}
                </Badge>
              </div>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-start">
                  {trainer.name}
                  <Badge bg="light" text="dark" className="ms-2">
                    ⭐ {trainer.rating}
                  </Badge>
                </Card.Title>
                <Card.Text>
                  <strong>Specialty:</strong> {trainer.specialty}<br />
                  <strong>Experience:</strong> {trainer.experience}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="bg-white border-0">
                <Button 
                  variant={trainer.available ? "primary" : "secondary"} 
                  className="w-100"
                  disabled={!trainer.available}
                >
                  {trainer.available ? "Book Session" : "Not Available"}
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Trainers;