import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/users',       label: '&#128100; Users' },
  { to: '/teams',       label: '&#128101; Teams' },
  { to: '/activities',  label: '&#127939; Activities' },
  { to: '/leaderboard', label: '&#127942; Leaderboard' },
  { to: '/workouts',    label: '&#127947; Workouts' },
];

function Home() {
  return (
    <div className="octofit-hero mt-4">
      <h1>&#128170; OctoFit Tracker</h1>
      <p className="mt-3 mb-4">
        Track your activities, compete on the leaderboard, and stay fit with your team.
      </p>
      <div className="d-flex justify-content-center gap-3 flex-wrap">
        {navItems.map(({ to, label }) => (
          <NavLink key={to} to={to} className="btn btn-hero">
            <span dangerouslySetInnerHTML={{ __html: label }} />
          </NavLink>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg octofit-navbar">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img
              src={process.env.PUBLIC_URL + '/octofitapp-small.png'}
              alt="OctoFit logo"
            />
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler border-secondary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-1">
              {navItems.map(({ to, label }) => (
                <li key={to} className="nav-item">
                  <NavLink
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                    to={to}
                    dangerouslySetInnerHTML={{ __html: label }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4 mb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
