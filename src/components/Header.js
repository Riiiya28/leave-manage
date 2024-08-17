// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import '../styles.css';

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
          <Link className="button-link" to="/">Home</Link>
          {isAuthenticated && user.role === 'employee' && (
            <>
              <Link className="button-link" to="/apply-leave">Apply Leave</Link>
              <Link className="button-link" to="/leave-history">Leave History</Link>
            </>
          )}
          {isAuthenticated && user.role === 'admin' && (
            <Link className="button-link" to="/leave-requests">Leave Requests</Link>
          )}
          {isAuthenticated ? (
            <button className="button-link" onClick={handleLogout}>Logout</button>
          ) : (
            <Link className="button-link" to="/login">Login</Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
