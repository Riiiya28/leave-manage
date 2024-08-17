import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import LeaveSummary from '../components/LeaveSummary';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles.css';

const Home = () => {
  const { leaveRequests } = useSelector((state) => state.leave);
  const { user } = useSelector((state) => state.auth);

  // user is not null
  const userLeaves = user 
    ? leaveRequests.filter((leave) => leave.applicant === user.username && leave.status === 'Accepted')
    : [];

  const leaveDates = userLeaves.map(leave => {
    const start = new Date(leave.startDate);
    const end = new Date(leave.endDate);
    const dates = [];
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    return dates;
  }).flat();

  return (
    <div>
      <Header />
      <h1>Welcome to Employee Leave Management System</h1>
      {user && <p><h1>{user.username}</h1></p>} 
      <LeaveSummary />
      <Calendar 
        tileClassName={({ date, view }) => 
          leaveDates.some(d => d.toDateString() === date.toDateString()) ? 'highlight' : null
        }
      />
    </div>
  );
};

export default Home;
