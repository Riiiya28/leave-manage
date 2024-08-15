// src/redux/actions/leaveActions.js
export const addLeaveRequest = (leaveRequest, applicant) => {
  return {
    type: 'ADD_LEAVE_REQUEST',
    payload: {
      ...leaveRequest,
      id: Date.now().toString(),
      status: 'Pending',
      applicant, 
      // history: [], // history of actions (pending/accepted/rejected)
    },
  };
};

export const acceptLeave = (id, approver) => {
  return {
    type: 'ACCEPT_LEAVE',
    payload: { id, approver },
  };
};

export const rejectLeave = (id, approver) => {
  return {
    type: 'REJECT_LEAVE',
    payload: { id, approver },
  };
};
