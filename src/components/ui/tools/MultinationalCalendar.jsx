import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment-timezone';

const MultinationalCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [timeZone, setTimeZone] = useState(moment.tz.guess()); // Get the user's timezone

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEventChange = (e) => {
    setEventTitle(e.target.value);
  };

  const addEvent = () => {
    if (eventTitle) {
      setEvents((prevEvents) => [
        ...prevEvents,
        { date: selectedDate.toLocaleDateString(), title: eventTitle },
      ]);
      setEventTitle('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Multinational Calendar</h1>
      
      <Calendar onChange={handleDateChange} value={selectedDate} className="mb-4" />
      
      <p className="text-center text-xl">Selected Date: {selectedDate.toLocaleDateString()}</p>
      
      <div className="mt-4">
        <input
          type="text"
          placeholder="Event Title"
          value={eventTitle}
          onChange={handleEventChange}
          className="border rounded p-2 w-full mb-2"
        />
        <button onClick={addEvent} className="bg-blue-500 text-white rounded p-2 w-full">
          Add Event
        </button>
      </div>

      <h2 className="text-lg font-bold mt-4">Events on {selectedDate.toLocaleDateString()}:</h2>
      <ul>
        {events
          .filter((event) => event.date === selectedDate.toLocaleDateString())
          .map((event, index) => (
            <li key={index} className="border-b py-2">
              {event.title}
            </li>
          ))}
      </ul>

      <h2 className="text-lg font-bold mt-4">Select Time Zone:</h2>
      <select
        value={timeZone}
        onChange={(e) => setTimeZone(e.target.value)}
        className="border rounded p-2 w-full mb-4"
      >
        {moment.tz.names().map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultinationalCalendar;
