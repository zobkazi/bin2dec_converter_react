import  { useState } from "react";
import Calendar from "react-calendar"; // Import Calendar

// Custom Calendar component
const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to hold the selected date

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the selected date
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 p-4">
      <div className="max-w-md mx-auto p-6 bg-purple-400 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Select a Date</h1>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="mb-4"
      />
      <p className="text-center text-xl">
        Selected Date: {selectedDate.toLocaleDateString()}{" "}
        {/* Display selected date */}
      </p>
    </div>
    </div>
  );
};

export default MyCalendar;
