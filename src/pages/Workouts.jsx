import React, { useState } from 'react';
import { Table, Card, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  PlusCircle, 
  Clock, 
  Lightning,
  Activity,
  StarFill,
  Star,
  Filter
} from 'react-bootstrap-icons';
import './Workouts.css';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([
    { id: 1, name: 'Cardio Blast', duration: '45 min', difficulty: 'Intermediate', favorite: false, category: 'Cardio' },
    { id: 2, name: 'Strength Training', duration: '60 min', difficulty: 'Advanced', favorite: true, category: 'Strength' },
    { id: 3, name: 'Yoga Flow', duration: '30 min', difficulty: 'Beginner', favorite: false, category: 'Flexibility' },
    { id: 4, name: 'HIIT', duration: '30 min', difficulty: 'Advanced', favorite: true, category: 'HIIT' },
    { id: 5, name: 'Core Crusher', duration: '25 min', difficulty: 'Intermediate', favorite: false, category: 'Core' },
    { id: 6, name: 'Leg Day', duration: '50 min', difficulty: 'Advanced', favorite: false, category: 'Strength' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    duration: '',
    difficulty: 'Beginner',
    category: 'Cardio'
  });

  const toggleFavorite = (id) => {
    setWorkouts(workouts.map(workout => 
      workout.id === id ? {...workout, favorite: !workout.favorite} : workout
    ));
  };

  const handleAddWorkout = (e) => {
    e.preventDefault();
    const newId = Math.max(...workouts.map(w => w.id)) + 1;
    setWorkouts([...workouts, {
      ...newWorkout,
      id: newId,
      favorite: false
    }]);
    setNewWorkout({
      name: '',
      duration: '',
      difficulty: 'Beginner',
      category: 'Cardio'
    });
    setShowAddForm(false);
  };

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || workout.category === filter;
    return matchesSearch && matchesFilter;
  });

  const difficultyVariant = {
    Beginner: 'success',
    Intermediate: 'warning',
    Advanced: 'danger'
  };

  const categoryColors = {
    Cardio: '#4e73df',
    Strength: '#e74a3b',
    Flexibility: '#1cc88a',
    HIIT: '#f6c23e',
    Core: '#36b9cc'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="workouts-page"
    >
      <div className="workouts-header">
        <motion.h2 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="page-title"
        >
          Workout Programs
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="controls"
        >
          <InputGroup className="search-bar">
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search workouts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <div className="filter-group">
            <InputGroup.Text>
              <Filter />
            </InputGroup.Text>
            <Form.Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength</option>
              <option value="Flexibility">Flexibility</option>
              <option value="HIIT">HIIT</option>
              <option value="Core">Core</option>
            </Form.Select>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="add-button"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <PlusCircle size={20} className="me-2" />
            Add Workout
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="add-form-container"
          >
            <Card className="add-form-card">
              <Card.Body>
                <h5>Add New Workout</h5>
                <Form onSubmit={handleAddWorkout}>
                  <Form.Group className="mb-3">
                    <Form.Label>Workout Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter workout name"
                      value={newWorkout.name}
                      onChange={(e) => setNewWorkout({...newWorkout, name: e.target.value})}
                      required
                    />
                  </Form.Group>

                  <div className="row">
                    <Form.Group className="col-md-6 mb-3">
                      <Form.Label>Duration</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g. 30 min"
                        value={newWorkout.duration}
                        onChange={(e) => setNewWorkout({...newWorkout, duration: e.target.value})}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="col-md-6 mb-3">
                      <Form.Label>Difficulty</Form.Label>
                      <Form.Select
                        value={newWorkout.difficulty}
                        onChange={(e) => setNewWorkout({...newWorkout, difficulty: e.target.value})}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </Form.Select>
                    </Form.Group>
                  </div>

                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      value={newWorkout.category}
                      onChange={(e) => setNewWorkout({...newWorkout, category: e.target.value})}
                    >
                      <option value="Cardio">Cardio</option>
                      <option value="Strength">Strength</option>
                      <option value="Flexibility">Flexibility</option>
                      <option value="HIIT">HIIT</option>
                      <option value="Core">Core</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="form-buttons">
                    <Button variant="secondary" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                      Add Workout
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="workouts-container"
      >
        {filteredWorkouts.length === 0 ? (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="no-results"
          >
            <h5>No workouts found</h5>
            <p>Try adjusting your search or filter</p>
          </motion.div>
        ) : (
          <>
            <div className="table-responsive d-none d-lg-block">
              <Table hover className="workouts-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Duration</th>
                    <th>Difficulty</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredWorkouts.map((workout) => (
                      <motion.tr
                        key={workout.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.01, boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                        className="workout-row"
                      >
                        <td>
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleFavorite(workout.id)}
                            style={{ cursor: 'pointer' }}
                          >
                            {workout.favorite ? (
                              <StarFill className="text-warning" />
                            ) : (
                              <Star className="text-muted" />
                            )}
                          </motion.div>
                        </td>
                        <td>
                          <div className="workout-name">
                            <Activity className="me-2" style={{ color: categoryColors[workout.category] }} />
                            {workout.name}
                          </div>
                        </td>
                        <td>
                          <div className="duration">
                            <Clock className="me-2" />
                            {workout.duration}
                          </div>
                        </td>
                        <td>
                          <Badge bg={difficultyVariant[workout.difficulty]}>
                            {workout.difficulty}
                          </Badge>
                        </td>
                        <td>
                          <Badge 
                            style={{ 
                              backgroundColor: categoryColors[workout.category],
                              color: 'white'
                            }}
                          >
                            {workout.category}
                          </Badge>
                        </td>
                        <td>
                          <Button variant="outline-primary" size="sm" className="me-2">
                            View
                          </Button>
                          <Button variant="outline-success" size="sm">
                            Start
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </Table>
            </div>

            <div className="workout-card-view d-lg-none">
              {filteredWorkouts.map((workout) => (
                <motion.div
                  key={workout.id}
                  className="workout-card mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Card>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <div className="d-flex align-items-center mb-2">
                            <Activity className="me-2" style={{ color: categoryColors[workout.category] }} />
                            <h5 className="mb-0">{workout.name}</h5>
                          </div>
                          <div className="d-flex flex-wrap gap-2 mb-2">
                            <Badge bg={difficultyVariant[workout.difficulty]}>
                              {workout.difficulty}
                            </Badge>
                            <Badge style={{ backgroundColor: categoryColors[workout.category], color: 'white' }}>
                              {workout.category}
                            </Badge>
                          </div>
                        </div>
                        <div onClick={() => toggleFavorite(workout.id)} style={{ cursor: 'pointer' }}>
                          {workout.favorite ? <StarFill className="text-warning" /> : <Star className="text-muted" />}
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="d-flex align-items-center">
                          <Clock className="me-2" />
                          <span>{workout.duration}</span>
                        </div>
                        <div>
                          <Button variant="outline-primary" size="sm" className="me-2">
                            View
                          </Button>
                          <Button variant="outline-success" size="sm">
                            Start
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Workouts;