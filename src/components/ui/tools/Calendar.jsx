import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Import Calendar

// Custom Calendar component
const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to hold the selected date

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the selected date
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Select a Date</h1>
      <Calendar 
        onChange={handleDateChange} 
        value={selectedDate} 
        className="mb-4"
      />
      <p className="text-center text-xl">
        Selected Date: {selectedDate.toLocaleDateString()} {/* Display selected date */}
      </p>
    </div>
  );
};

export default MyCalendar;
