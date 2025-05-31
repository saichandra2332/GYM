import React from 'react';
import { Card, Image } from 'react-bootstrap';

function ContentArea() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Welcome to Fitness Gym Center</Card.Title>
        <Card.Text>
          Your one-stop destination for all your fitness needs. We offer state-of-the-art equipment,
          professional trainers, and a variety of classes to help you achieve your fitness goals.
        </Card.Text>
        <Image src="/gym-image.jpg" fluid rounded className="mt-3" />
      </Card.Body>
    </Card>
  );
}

export default ContentArea;