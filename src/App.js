import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Workouts from './pages/Workouts';
import Members from './pages/Members';
import Schedule from './pages/Schedule';
import Logout from './pages/Logout';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route path="workouts" element={<Workouts />} />
          <Route path="members" element={<Members />} />
          <Route path="schedule" element={<Schedule />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;