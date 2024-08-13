// src/pages/LeaveRequests.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const LeaveRequests = () => {
  const { leaveRequests } = useSelector((state) => state.leave);
  const { user } = useSelector((state) => state.auth);

  const filteredRequests = leaveRequests.filter((leave) => {
    
    return leave.requestor === user.name || user.seniors.includes(leave.requestor);
  });

  return (
    <div className="leave-requests">
      <h2>Leave Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.type}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.status}</td>
              <td>{leave.reason}</td>
              <td>
                <Link to={`/leave/${leave.id}`}>
                  <button>View Details</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequests;
