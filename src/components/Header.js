// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {isAuthenticated && user.role === 'employee' && (
            <>
              <li><Link to="/apply-leave">Apply Leave</Link></li>
              <li><Link to="/leave-history">Leave History</Link></li>
            </>
          )}
          {isAuthenticated && user.role === 'admin' && (
            <li><Link to="/leave-requests">Leave Requests</Link></li>
          )}
          {isAuthenticated ? (
            <li><button onClick={handleLogout}>Logout</button></li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
