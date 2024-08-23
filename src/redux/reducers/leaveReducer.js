// src/redux/reducers/leaveReducer.js
import { ADD_LEAVE_REQUEST, ACCEPT_LEAVE, REJECT_LEAVE, REVOKE_LEAVE } from '../actions/leaveActions';

const initialState = {
  leaveRequests: JSON.parse(localStorage.getItem('leaveRequests')) || [],
  totalLeaves: {
    employee1: 30,
    employee2: 30,
  },
};

const saveToLocalStorage = (state) => {
  localStorage.setItem('leaveRequests', JSON.stringify(state.leaveRequests));
};

const leaveReducer = (state = initialState, action) => {
  let updatedState;

  switch (action.type) {
    case ADD_LEAVE_REQUEST:
      updatedState = {
        ...state,
        leaveRequests: [
          ...state.leaveRequests, 
          { 
            ...action.payload.leaveRequest, 
            id: Date.now().toString(), 
            applicant: action.payload.applicant, 
            status: 'Pending', 
            history: [] 
          }
        ],
      };
      saveToLocalStorage(updatedState);
      return updatedState;

    case ACCEPT_LEAVE:
      updatedState = {
        ...state,
        leaveRequests: state.leaveRequests.map((leave) =>
          leave.id === action.payload.id
            ? {
                ...leave,
                status: 'Accepted',
                history: [...leave.history, { action: 'Accepted', date: new Date(), approver: action.payload.approver }],
              }
            : leave
        ),
      };
      saveToLocalStorage(updatedState);
      return updatedState;

    case REJECT_LEAVE:
      updatedState = {
        ...state,
        leaveRequests: state.leaveRequests.map((leave) =>
          leave.id === action.payload.id
            ? {
                ...leave,
                status: 'Rejected',
                history: [...leave.history, { action: 'Rejected', date: new Date(), approver: action.payload.approver }],
              }
            : leave
        ),
      };
      saveToLocalStorage(updatedState);
      return updatedState;

    case REVOKE_LEAVE:
      updatedState = {
        ...state,
        leaveRequests: state.leaveRequests.map((leave) =>
          leave.id === action.payload.id &&
          (leave.status === 'Accepted' || leave.status === 'Pending') &&
          (leave.status === 'Accepted' ? new Date(leave.startDate) >= new Date() : true)
            ? {
                ...leave,
                status: 'Revoked',
                history: [...leave.history, { action: 'Revoked', date: new Date() }],
              }
            : leave
        ),
      };
      saveToLocalStorage(updatedState);
      return updatedState;

    default:
      return state;
  }
};

export default leaveReducer;


