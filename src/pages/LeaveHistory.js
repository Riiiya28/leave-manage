// src/pages/LeaveHistory.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const LeaveHistory = () => {
  const { leaveRequests } = useSelector((state) => state.leave);
  const { user } = useSelector((state) => state.auth);

  
  const userRequests = leaveRequests.filter((leave) => leave.applicant === user.username);

  return (
    <div>
      <h2>Leave History</h2>
      {userRequests.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Reason</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userRequests.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.type}</td>
                <td>{leave.reason}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.status}</td>
                <td>
                <Link to={`/leave/${leave.id}`}>
                  <button>View Details</button>
                </Link>
                
                {/* {(user.role === 'admin' && user.managedEmployees.includes(leave.applicant)) && (
                  <button>Approve/Reject</button>
                )} */}
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No leave requests found.</p>
      )}
    </div>
  );
};

export default LeaveHistory;
