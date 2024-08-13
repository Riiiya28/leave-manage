// src/components/LeaveDetails.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { acceptLeave, rejectLeave } from '../redux/actions/leaveActions';

const LeaveDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { leaveRequests } = useSelector((state) => state.leave);
  const { user } = useSelector((state) => state.auth);

  const leaveRequest = leaveRequests.find((leave) => leave.id === id);

  if (!leaveRequest) {
    return <p>Leave request not found.</p>;
  }

  // history array before mapping
  const history = leaveRequest.history || [];

  const handleAccept = () => {
    dispatch(acceptLeave(id, user.name));
    navigate('/leave-requests');
  };

  const handleReject = () => {
    dispatch(rejectLeave(id, user.name));
    navigate('/leave-requests');
  };

  return (
    <div className="leave-details">
      <h2>Leave Request Details</h2>
      <p><strong>Type:</strong> {leaveRequest.type}</p>
      <p><strong>Start Date:</strong> {leaveRequest.startDate}</p>
      <p><strong>End Date:</strong> {leaveRequest.endDate}</p>
      <p><strong>Status:</strong> {leaveRequest.status}</p>
      {/* <p><strong>Applicant:</strong> {leaveRequest.applicant}</p> */}
      <p><strong>Reason:</strong> {leaveRequest.reason}</p>

      <h3>History</h3>
      {history.length > 0 ? (
        <ul>
          {history.map((entry, index) => (
            <li key={index}>{entry.action}  on {new Date(entry.date).toLocaleString()}</li>
          ))}
        </ul>
      ) : (
        <p>No history available.</p>
      )}

      {user.role === 'admin' && leaveRequest.status === 'Pending' && (
        <div className="action-buttons">
          <button onClick={handleAccept}>Accept</button>
          <button className="reject" onClick={handleReject}>Reject</button>
        </div>
      )}

      {leaveRequest.status !== 'Pending' && (
        <p>This leave request has already been {leaveRequest.status.toLowerCase()}.</p>
      )}
    </div>
  );
};

export default LeaveDetails;
