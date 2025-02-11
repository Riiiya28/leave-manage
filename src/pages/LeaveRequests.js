import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles.css';

const LeaveRequests = () => {
  const { leaveRequests } = useSelector((state) => state.leave);
  const { user, users } = useSelector((state) => state.auth);

  const managedEmployees = users.find(u => u.username === user.username)?.managedEmployees || [];

  
  const filteredRequests = leaveRequests.filter((leave) => {
    if (leave.applicant === user.username) return true;

   
    if (user.role === 'admin' && managedEmployees.includes(leave.applicant)) {
      return true; // Admin can see their managed employees req
    }

    
    if (leave.applicant === 'employee1' && user.username === 'admin1') {
      return true; // admin1 can see employee1 req
    }

    if (leave.applicant === 'employee2' && (user.username === 'admin2' || user.username === 'admin1')) {
      return true; // admin2 and admin1 can see employee2 req
    }

    return false; 
  });

  return (
    <div className="leave-requests">
      <Link className="button-link" to="/">Home</Link>
      <Link className="button-link" to="/leave-requests">Leave Requests</Link>

      {user && <p><h1>{user.username}</h1></p>}
      <h2>Leave Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
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
              <td>{leave.applicant}</td>
              <td>{leave.type}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.status}</td>
              <td>{leave.reason}</td>
              <td>
                <Link to={`/leave/${leave.id}`}>
                  <button className="button-link" >View Details</button>
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
