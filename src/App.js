// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ApplyLeave from './pages/ApplyLeave';
import LeaveRequests from './pages/LeaveRequests';
import Login from './pages/Login';
import LeaveDetails from './components/LeaveDetails';
import ProtectedRoute from './components/ProtectedRoute';
import LeaveHistory from './pages/LeaveHistory';
import './styles.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/apply-leave" element={
        <ProtectedRoute roles={['employee']}>
          <ApplyLeave />
        </ProtectedRoute>
      } />
      <Route path="/leave-requests" element={
        <ProtectedRoute roles={['admin', 'employee']}>
          <LeaveRequests />
        </ProtectedRoute>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/leave/:id" element={
        <ProtectedRoute roles={['admin', 'employee']}>
          <LeaveDetails />
        </ProtectedRoute>
      } />
      <Route path="/leave-history" element={
        <ProtectedRoute roles={['employee']}>
          <LeaveHistory />
        </ProtectedRoute>
      } />
    </Routes>
  </Router>
);

export default App;
