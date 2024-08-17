// src/components/LoginForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = null;

    // managedEmployees for each admin
    const managedEmployees = {
      admin1: ['employee1'],
      admin2: ['employee2'],
    };

    if (credentials.username === 'admin1' && credentials.password === 'admin11') {
      user = { username: 'admin1', role: 'admin', managedEmployees: managedEmployees.admin1 };
    } else if (credentials.username === 'admin2' && credentials.password === 'admin22') {
      user = { username: 'admin2', role: 'admin', managedEmployees: managedEmployees.admin2 };
    } else if (credentials.username === 'employee1' && credentials.password === 'pass1') {
      user = { username: 'employee1', role: 'employee', managedEmployees: [] };
    } else if (credentials.username === 'employee2' && credentials.password === 'pass2') {
      user = { username: 'employee2', role: 'employee', managedEmployees: [] };
    }

    if (user) {
      dispatch(login(user));
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-inline">
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button className="button-link" type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
