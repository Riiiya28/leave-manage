// src/pages/LeaveHistory.js
import React from 'react';
import { useSelector } from 'react-redux';

const LeaveHistory = () => {
  const { leaveRequests } = useSelector((state) => state.leave);
  const { user } = useSelector((state) => state.auth);

  // leave request based on the loggedin user's name
  const userRequests = leaveRequests.filter((leave) => leave.applicant === user.name);

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
