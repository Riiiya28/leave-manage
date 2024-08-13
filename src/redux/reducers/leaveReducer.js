// src/redux/reducers/leaveReducer.js
const initialState = {
  leaveRequests: JSON.parse(localStorage.getItem('leaveRequests')) || [],
};

const leaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LEAVE_REQUEST':
      const updatedRequests = [...state.leaveRequests, { ...action.payload, history: [] }];
      localStorage.setItem('leaveRequests', JSON.stringify(updatedRequests));
      return {
        ...state,
        leaveRequests: updatedRequests,
      };

    case 'ACCEPT_LEAVE':
      const acceptUpdated = state.leaveRequests.map((leave) =>
        leave.id === action.payload.id
          ? { 
              ...leave, 
              status: 'Accepted', 
              history: [...(leave.history || []), { action: 'Accepted', by: action.payload.approver, date: new Date() }] 
            }
          : leave
      );
      localStorage.setItem('leaveRequests', JSON.stringify(acceptUpdated));
      return { ...state, leaveRequests: acceptUpdated };

    case 'REJECT_LEAVE':
      const rejectUpdated = state.leaveRequests.map((leave) =>
        leave.id === action.payload.id
          ? { 
              ...leave, 
              status: 'Rejected', 
              history: [...(leave.history || []), { action: 'Rejected', by: action.payload.approver, date: new Date() }] 
            }
          : leave
      );
      localStorage.setItem('leaveRequests', JSON.stringify(rejectUpdated));
      return { ...state, leaveRequests: rejectUpdated };

    default:
      return state;
  }
};

export default leaveReducer;
