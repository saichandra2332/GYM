import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Workouts from './pages/Workouts';
import Members from './pages/Members';
import Trainers from './pages/Trainers';
import Schedule from './pages/Schedule';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Payment from './pages/Payment';
import Logout from './pages/Logout';
import Nutrition from './pages/Nutrition';
import Progress from './pages/Progress';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route path="workouts" element={<Workouts />} />
          <Route path="members" element={<Members />} />
          <Route path="trainers" element={<Trainers />} />
          <Route path="schedule" element={<Schedule />} />
        </Route>
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </Router>
  );
}

export default App;