// src/redux/actions/leaveActions.js
export const ADD_LEAVE_REQUEST = 'ADD_LEAVE_REQUEST';
export const ACCEPT_LEAVE = 'ACCEPT_LEAVE';
export const REJECT_LEAVE = 'REJECT_LEAVE';
export const REVOKE_LEAVE = 'REVOKE_LEAVE'; 

export const addLeaveRequest = (leaveRequest, applicant) => ({
  type: ADD_LEAVE_REQUEST,
  payload: { leaveRequest, applicant },
});

export const acceptLeave = (id, approver) => ({
  type: ACCEPT_LEAVE,
  payload: { id, approver },
});

export const rejectLeave = (id, approver) => ({
  type: REJECT_LEAVE,
  payload: { id, approver },
});

export const revokeLeave = (id) => ({
  type: REVOKE_LEAVE,
  payload: { id }, 
});


