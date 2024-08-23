import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { revokeLeave } from '../redux/actions/leaveActions';
import '../styles.css';

const LeaveHistory = () => {
  const { leaveRequests } = useSelector((state) => state.leave);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleRevoke = (id) => {
    dispatch(revokeLeave(id));
  };

  const userRequests = leaveRequests.filter((leave) => leave.applicant === user.username);

  return (
    <div>
      <Link className="button-link" to="/">Home</Link>
      <Link className="button-link" to="/apply-leave">Apply Leave</Link>
      <Link className="button-link" to="/leave-history">Leave History</Link>

      {user && <p><h1>{user.username}</h1></p>}
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
                    <button className="button-link">View Details</button>
                  </Link>
                  {(leave.status === 'Accepted' && new Date(leave.startDate) >= new Date()) || (leave.status === 'Pending' && new Date(leave.startDate) >= new Date()) ? (
                    <button className="button-link" onClick={() => handleRevoke(leave.id)}>Revoke</button>
                  ) : null}
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
