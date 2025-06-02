import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Badge, Form, InputGroup, ProgressBar, Modal, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  PlusCircle, 
  Clock, 
  Lightning,
  Activity,
  StarFill,
  Star,
  Filter,
  Fire,
  Heart,
  HeartFill,
  Trophy,
  BarChart,
  Calendar,
  Person,
  Stopwatch,
  ArrowRight,
  PlayFill,
  InfoCircle,
  X,
  CheckCircle
} from 'react-bootstrap-icons';
import './Workouts.css';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([
    { 
      id: 1, 
      name: 'Cardio Blast', 
      duration: 45, 
      difficulty: 'Intermediate', 
      favorite: false, 
      category: 'Cardio',
      calories: 320,
      description: 'High-energy cardio workout to boost your heart rate and burn calories',
      exercises: ['Jumping Jacks', 'Burpees', 'Mountain Climbers', 'High Knees'],
      completed: false,
      lastCompleted: null
    },
    { 
      id: 2, 
      name: 'Strength Training', 
      duration: 60, 
      difficulty: 'Advanced', 
      favorite: true, 
      category: 'Strength',
      calories: 450,
      description: 'Build muscle and increase strength with compound exercises',
      exercises: ['Squats', 'Deadlifts', 'Bench Press', 'Pull-ups'],
      completed: true,
      lastCompleted: '2023-05-15'
    },
    { 
      id: 3, 
      name: 'Yoga Flow', 
      duration: 30, 
      difficulty: 'Beginner', 
      favorite: false, 
      category: 'Flexibility',
      calories: 180,
      description: 'Gentle yoga sequence to improve flexibility and reduce stress',
      exercises: ['Downward Dog', 'Warrior Pose', 'Tree Pose', 'Child\'s Pose'],
      completed: false,
      lastCompleted: null
    },
    { 
      id: 4, 
      name: 'HIIT Challenge', 
      duration: 30, 
      difficulty: 'Advanced', 
      favorite: true, 
      category: 'HIIT',
      calories: 400,
      description: 'High-intensity interval training for maximum fat burning',
      exercises: ['Sprints', 'Jump Squats', 'Plank Jacks', 'Box Jumps'],
      completed: false,
      lastCompleted: '2023-05-10'
    },
    { 
      id: 5, 
      name: 'Core Crusher', 
      duration: 25, 
      difficulty: 'Intermediate', 
      favorite: false, 
      category: 'Core',
      calories: 280,
      description: 'Target all your core muscles with this intense abdominal workout',
      exercises: ['Plank', 'Russian Twists', 'Leg Raises', 'Bicycle Crunches'],
      completed: true,
      lastCompleted: '2023-05-18'
    },
    { 
      id: 6, 
      name: 'Leg Day', 
      duration: 50, 
      difficulty: 'Advanced', 
      favorite: false, 
      category: 'Strength',
      calories: 500,
      description: 'Focus on lower body strength with heavy compound movements',
      exercises: ['Barbell Squats', 'Lunges', 'Leg Press', 'Calf Raises'],
      completed: false,
      lastCompleted: null
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [workoutProgress, setWorkoutProgress] = useState(0);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    duration: 30,
    difficulty: 'Beginner',
    category: 'Cardio',
    calories: 200,
    description: '',
    exercises: []
  });

  // Stats for the user
  const [stats, setStats] = useState({
    totalWorkouts: 12,
    caloriesBurned: 3840,
    favoriteCategory: 'Strength',
    streak: 5
  });

  useEffect(() => {
    // Simulate workout progress when active
    if (activeWorkout) {
      const interval = setInterval(() => {
        setWorkoutProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, (activeWorkout.duration * 600) / 100); // Convert minutes to ms for progress

      return () => clearInterval(interval);
    }
  }, [activeWorkout]);

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
      favorite: false,
      completed: false,
      lastCompleted: null
    }]);
    setNewWorkout({
      name: '',
      duration: 30,
      difficulty: 'Beginner',
      category: 'Cardio',
      calories: 200,
      description: '',
      exercises: []
    });
    setShowAddForm(false);
  };

  const startWorkout = (workout) => {
    setActiveWorkout(workout);
    setWorkoutProgress(0);
  };

  const completeWorkout = () => {
    setWorkouts(workouts.map(w => 
      w.id === activeWorkout.id 
        ? {...w, completed: true, lastCompleted: new Date().toISOString().split('T')[0]} 
        : w
    ));
    setStats({
      ...stats,
      totalWorkouts: stats.totalWorkouts + 1,
      caloriesBurned: stats.caloriesBurned + activeWorkout.calories
    });
    setActiveWorkout(null);
    setWorkoutProgress(0);
    setShowCompletionModal(false);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 5000);
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

  const categoryIcons = {
    Cardio: <Lightning size={18} />,
    Strength: <Fire size={18} />,
    Flexibility: <Heart size={18} />,
    HIIT: <Lightning size={18} />,
    Core: <Activity size={18} />
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="workouts-page"
    >
      {/* Active Workout Overlay */}
      {activeWorkout && (
        <motion.div 
          className="active-workout-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Card className="active-workout-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>{activeWorkout.name}</h3>
                <Button 
                  variant="outline-danger" 
                  onClick={() => {
                    setActiveWorkout(null);
                    setWorkoutProgress(0);
                  }}
                >
                  <X size={20} />
                </Button>
              </div>
              
              <div className="workout-progress mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Progress</span>
                  <span>{workoutProgress}%</span>
                </div>
                <ProgressBar 
                  now={workoutProgress} 
                  variant="success" 
                  animated 
                  striped 
                />
              </div>
              
              <div className="workout-stats mb-4">
                <div className="stat-item">
                  <Clock size={20} className="me-2" />
                  <span>{activeWorkout.duration} min</span>
                </div>
                <div className="stat-item">
                  <Fire size={20} className="me-2" />
                  <span>{activeWorkout.calories} kcal</span>
                </div>
                <div className="stat-item">
                  <Activity size={20} className="me-2" />
                  <span>{activeWorkout.exercises.length} exercises</span>
                </div>
              </div>
              
              <motion.div 
                className="current-exercise"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
              >
                <h5>Current Exercise:</h5>
                <div className="exercise-card">
                  {activeWorkout.exercises[Math.floor(workoutProgress / (100 / activeWorkout.exercises.length))]}
                </div>
              </motion.div>
              
              {workoutProgress >= 100 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4"
                >
                  <Button 
                    variant="success" 
                    size="lg" 
                    className="w-100"
                    onClick={() => setShowCompletionModal(true)}
                  >
                    <CheckCircle size={20} className="me-2" />
                    Complete Workout
                  </Button>
                </motion.div>
              )}
            </Card.Body>
          </Card>
        </motion.div>
      )}
      
      {/* Completion Modal */}
      <Modal show={showCompletionModal} onHide={() => setShowCompletionModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Workout Complete!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 0.8 }}
            >
              <Trophy size={48} className="text-warning mb-3" />
            </motion.div>
            <h4>Great job!</h4>
            <p>You've completed {activeWorkout?.name} and burned {activeWorkout?.calories} calories!</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCompletionModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={completeWorkout}>
            Save Results
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Success Alert */}
      <AnimatePresence>
        {showSuccessAlert && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="success-alert"
          >
            <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
              <CheckCircle size={20} className="me-2" />
              Workout completed successfully! Your stats have been updated.
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Workout Details Modal */}
      <Modal show={showDetails !== null} onHide={() => setShowDetails(null)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{workouts.find(w => w.id === showDetails)?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showDetails !== null && (
            <div>
              <div className="d-flex justify-content-between mb-4">
                <Badge bg={difficultyVariant[workouts.find(w => w.id === showDetails).difficulty]}>
                  {workouts.find(w => w.id === showDetails).difficulty}
                </Badge>
                <Badge 
                  style={{ 
                    backgroundColor: categoryColors[workouts.find(w => w.id === showDetails).category],
                    color: 'white'
                  }}
                >
                  {workouts.find(w => w.id === showDetails).category}
                </Badge>
              </div>
              
              <p className="workout-description">
                {workouts.find(w => w.id === showDetails).description}
              </p>
              
              <div className="workout-stats-grid mb-4">
                <div className="stat-box">
                  <Clock size={24} />
                  <span>{workouts.find(w => w.id === showDetails).duration} min</span>
                </div>
                <div className="stat-box">
                  <Fire size={24} />
                  <span>{workouts.find(w => w.id === showDetails).calories} kcal</span>
                </div>
                <div className="stat-box">
                  <Activity size={24} />
                  <span>{workouts.find(w => w.id === showDetails).exercises.length} exercises</span>
                </div>
                <div className="stat-box">
                  <Calendar size={24} />
                  <span>
                    {workouts.find(w => w.id === showDetails).lastCompleted 
                      ? `Last done: ${workouts.find(w => w.id === showDetails).lastCompleted}`
                      : 'Not completed yet'}
                  </span>
                </div>
              </div>
              
              <h5 className="mb-3">Exercises:</h5>
              <ul className="exercise-list">
                {workouts.find(w => w.id === showDetails).exercises.map((exercise, index) => (
                  <motion.li 
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="exercise-number">{index + 1}</span>
                    {exercise}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetails(null)}>
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={() => {
              startWorkout(workouts.find(w => w.id === showDetails));
              setShowDetails(null);
            }}
          >
            <PlayFill size={18} className="me-2" />
            Start Workout
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="workouts-header">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="d-flex justify-content-between align-items-center flex-wrap"
        >
          <div>
            <h2 className="page-title">Workout Programs</h2>
            <p className="page-subtitle">Build your perfect fitness routine</p>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="user-stats-card"
          >
            <div className="stat-item">
              <Trophy size={18} className="me-2" />
              <span>{stats.totalWorkouts} workouts</span>
            </div>
            <div className="stat-item">
              <Fire size={18} className="me-2" />
              <span>{stats.caloriesBurned} kcal</span>
            </div>
            <div className="stat-item">
              <BarChart size={18} className="me-2" />
              <span>{stats.streak} day streak</span>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="controls"
        >
          <div className="d-flex flex-column flex-md-row w-100 gap-3">
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

            <div className="d-flex gap-3">
              <InputGroup className="filter-group">
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
              </InputGroup>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="add-button"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                <PlusCircle size={20} className="me-2" />
                <span className="d-none d-md-inline">Add Workout</span>
                <span className="d-md-none">Add</span>
              </motion.button>
            </div>
          </div>
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
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5>Add New Workout</h5>
                  <Button 
                    variant="link" 
                    onClick={() => setShowAddForm(false)}
                    className="close-btn"
                  >
                    <X size={20} />
                  </Button>
                </div>
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
                      <Form.Label>Duration (minutes)</Form.Label>
                      <Form.Control
                        type="number"
                        min="5"
                        max="120"
                        value={newWorkout.duration}
                        onChange={(e) => setNewWorkout({...newWorkout, duration: parseInt(e.target.value)})}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="col-md-6 mb-3">
                      <Form.Label>Calories</Form.Label>
                      <Form.Control
                        type="number"
                        min="50"
                        max="1000"
                        value={newWorkout.calories}
                        onChange={(e) => setNewWorkout({...newWorkout, calories: parseInt(e.target.value)})}
                        required
                      />
                    </Form.Group>
                  </div>

                  <div className="row">
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

                    <Form.Group className="col-md-6 mb-3">
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
                  </div>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Describe the workout..."
                      value={newWorkout.description}
                      onChange={(e) => setNewWorkout({...newWorkout, description: e.target.value})}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Exercises (comma separated)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. Squats, Push-ups, Lunges"
                      value={newWorkout.exercises.join(', ')}
                      onChange={(e) => setNewWorkout({...newWorkout, exercises: e.target.value.split(',').map(ex => ex.trim())})}
                    />
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
            <Button 
              variant="outline-primary" 
              onClick={() => {
                setSearchTerm('');
                setFilter('All');
              }}
            >
              Reset Filters
            </Button>
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
                    <th>Calories</th>
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
                        className={`workout-row ${workout.completed ? 'completed-workout' : ''}`}
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
                            {categoryIcons[workout.category]}
                            <span className="ms-2">{workout.name}</span>
                            {workout.completed && (
                              <Badge bg="success" className="ms-2">
                                Completed
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="duration">
                            <Clock className="me-2" />
                            {workout.duration} min
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
                          <div className="calories">
                            <Fire className="me-2" />
                            {workout.calories} kcal
                          </div>
                        </td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-2"
                            onClick={() => setShowDetails(workout.id)}
                          >
                            <InfoCircle className="me-1" />
                            Details
                          </Button>
                          <Button 
                            variant="outline-success" 
                            size="sm"
                            onClick={() => startWorkout(workout)}
                          >
                            <PlayFill className="me-1" />
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
                  className={`workout-card mb-3 ${workout.completed ? 'completed-workout' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Card>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start">
                        <div style={{ flex: 1 }}>
                          <div className="d-flex align-items-center mb-2">
                            {categoryIcons[workout.category]}
                            <h5 className="mb-0 ms-2" style={{ fontSize: '1.1rem' }}>{workout.name}</h5>
                          </div>
                          <div className="d-flex flex-wrap gap-2 mb-2">
                            <Badge bg={difficultyVariant[workout.difficulty]}>
                              {workout.difficulty}
                            </Badge>
                            <Badge style={{ backgroundColor: categoryColors[workout.category], color: 'white' }}>
                              {workout.category}
                            </Badge>
                            {workout.completed && (
                              <Badge bg="success">
                                Completed
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div onClick={() => toggleFavorite(workout.id)} style={{ cursor: 'pointer' }}>
                          {workout.favorite ? <StarFill className="text-warning" /> : <Star className="text-muted" />}
                        </div>
                      </div>
                      
                      <div className="workout-stats-grid mb-3">
                        <div className="stat-box">
                          <Clock size={16} />
                          <span>{workout.duration} min</span>
                        </div>
                        <div className="stat-box">
                          <Fire size={16} />
                          <span>{workout.calories} kcal</span>
                        </div>
                        <div className="stat-box">
                          <Activity size={16} />
                          <span>{workout.exercises.length} ex.</span>
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between gap-2">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          className="flex-grow-1"
                          onClick={() => setShowDetails(workout.id)}
                        >
                          <InfoCircle className="me-1" />
                          Details
                        </Button>
                        <Button 
                          variant="outline-success" 
                          size="sm"
                          className="flex-grow-1"
                          onClick={() => startWorkout(workout)}
                        >
                          <PlayFill className="me-1" />
                          Start
                        </Button>
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