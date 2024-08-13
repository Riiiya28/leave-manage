// src/pages/ApplyLeave.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLeaveRequest } from '../redux/actions/leaveActions';
import { useNavigate } from 'react-router-dom';

const ApplyLeave = () => {
  const [type, setType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addLeaveRequest({ type, startDate, endDate, reason }));
    navigate('/leave-history'); 
  };

  return (
    <div className="apply-leave">
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ApplyLeave;
