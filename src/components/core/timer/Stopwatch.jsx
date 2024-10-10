import { useState, useEffect } from "react";

const Stopwatch = () => {
  // Stopwatch state
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false); // Start/Stop state
  const [laps, setLaps] = useState([]); // Store lap times

  // useEffect to handle the ticking of the stopwatch
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Update time every 10 milliseconds
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // Formatting time to HH:MM:SS:MS format
  const formatTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Start/Stop the stopwatch
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  // Reset the stopwatch
  const handleReset = () => {
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  // Record a lap
  const handleLap = () => {
    setLaps([...laps, time]);
  };

  return (
    <div className="min-h-screen bg-purple-800 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-700 mb-8">Stopwatch</h1>

        {/* Display the formatted time */}
        <div className="text-5xl font-mono text-gray-800 mb-8">
          {formatTime(time)}
        </div>

        {/* Buttons for Start/Stop, Lap, and Reset */}
        <div className="flex justify-around space-x-4 mb-6">
          <button
            className={`${
              isRunning ? "bg-red-500" : "bg-green-500"
            } text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition`}
            onClick={handleStartStop}
          >
            {isRunning ? "Stop" : "Start"}
          </button>

          <button
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            onClick={handleLap}
            disabled={!isRunning}
          >
            Lap
          </button>

          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        {/* Display the recorded lap times */}
        {laps.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-600 mb-4">Laps</h2>
            <ul className="text-lg font-mono text-gray-800">
              {laps.map((lap, index) => (
                <li key={index} className="mb-2">
                  Lap {index + 1}: {formatTime(lap)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;
