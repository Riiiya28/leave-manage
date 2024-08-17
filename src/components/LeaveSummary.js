import React from 'react';
import { useSelector } from 'react-redux';
import '../styles.css';

const LeaveSummary = () => {
  const { leaveRequests, totalLeaves } = useSelector((state) => state.leave);
  const { user } = useSelector((state) => state.auth);

  const isEmployee = user && user.role === 'employee';

  // Calculate applied l if employee
  const appliedDays = isEmployee ? leaveRequests
    .filter((leave) => leave.applicant === user.username && leave.status === 'Accepted')
    .reduce((total, leave) => {
      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);
      const days = (end - start) / (1000 * 60 * 60 * 24) + 1;
      return total + days;
    }, 0) : 0;

  const remainingLeaves = isEmployee ? totalLeaves[user.username] - appliedDays : 0;

  return (
    <div>
      {isEmployee && (
        <>
          <h2>Leave Summary</h2>
          <p><strong>Total Leaves:</strong> {totalLeaves[user.username] || 0}</p>
          <p><strong>Applied Leaves:</strong> {appliedDays}</p>
          <p><strong>Remaining Leaves:</strong> {remainingLeaves}</p>
        </>
      )}
    </div>
  );
};

export default LeaveSummary;
