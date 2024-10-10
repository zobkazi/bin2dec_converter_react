import React, { useState, useEffect } from 'react';
import alarmSound from '../../../../public/alarm.mp3'; // Import your alarm sound file

const AlarmClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState('');
  const [alarms, setAlarms] = useState([]);
  const [volume, setVolume] = useState(1); // Volume level from 0 to 1
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const audioRef = React.useRef(new Audio(alarmSound));

  // Update the current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Check for alarms
  useEffect(() => {
    const checkAlarms = setInterval(() => {
      const now = currentTime.toLocaleTimeString('en-US', { hour12: false });
      alarms.forEach(alarm => {
        if (now === alarm) {
          if (isSoundEnabled) {
            audioRef.current.volume = volume; // Set volume level
            audioRef.current.play(); // Play the alarm sound
          }
          alert(`Alarm! It's ${now}`);
          setAlarms(prev => prev.filter(a => a !== alarm)); // Remove alarm after triggering
        }
      });
    }, 1000);

    return () => clearInterval(checkAlarms);
  }, [currentTime, alarms, isSoundEnabled, volume]);

  const handleAddAlarm = () => {
    if (alarmTime && !alarms.includes(alarmTime)) {
      setAlarms([...alarms, alarmTime]);
      setAlarmTime('');
    }
  };

  const handleDeleteAlarm = (time) => {
    setAlarms(alarms.filter(alarm => alarm !== time));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-purple-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Alarm Clock</h1>
      <h2 className="text-xl font-semibold mb-2 text-center">Current Time</h2>
      <p className="text-center text-2xl mb-4">{currentTime.toLocaleTimeString()}</p>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Set Alarm</h2>
        <input
          type="time"
          value={alarmTime}
          onChange={(e) => setAlarmTime(e.target.value)}
          className="border rounded-lg p-2 mr-2"
        />
        <button
          onClick={handleAddAlarm}
          className="bg-blue-500 text-white rounded-lg px-4 py-2"
        >
          Add Alarm
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-2">Active Alarms</h2>
      <ul className="list-disc pl-5 mb-4">
        {alarms.length === 0 ? (
          <li>No alarms set</li>
        ) : (
          alarms.map((alarm, index) => (
            <li key={index} className="flex justify-between">
              {alarm}
              <button
                onClick={() => handleDeleteAlarm(alarm)}
                className="text-red-500 ml-4"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>

      {/* Volume Control */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Volume Control</h2>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="w-full"
        />
        <p className="text-center">Volume: {Math.round(volume * 100)}%</p>
      </div>

      {/* Sound Toggle */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Sound Toggle</h2>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isSoundEnabled}
            onChange={() => setIsSoundEnabled(!isSoundEnabled)}
            className="mr-2"
          />
          Enable Sound
        </label>
      </div>
    </div>
  );
};

export default AlarmClock;
