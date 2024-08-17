// src/pages/ApplyLeave.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLeaveRequest } from '../redux/actions/leaveActions';
import { useNavigate, Link } from 'react-router-dom';
import '../styles.css';

const ApplyLeave = () => {
  const [type, setType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); 

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addLeaveRequest({ type, startDate, endDate, reason }, user.username));
    navigate('/leave-history');
  };

  return (
    <div className="apply-leave"> 
      <Link className="button-link" to="/">Home</Link>
      <Link className="button-link" to="/apply-leave">Apply Leave</Link>
      <Link className="button-link" to="/leave-history">Leave History</Link>

      {user && <p><h1>{user.username}</h1></p>}
      <h2>Apply for Leave</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Leave Type:
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
        </label>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </label>
        <label>
          Reason:
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} required />
        </label>
        <button className="button-link" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ApplyLeave;
