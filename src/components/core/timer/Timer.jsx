import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify'; 


const Timer = () => {
  // Timer state
  const [time, setTime] = useState(0); // Time in seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Effect for countdown
  useEffect(() => {
    let interval= null;

    if (isActive && !isPaused && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      setIsActive(false);
      setIsPaused(false);
      toast.success('Timer completed!');
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, time]);

  // Handle input change for setting the timer
  const handleChange = (e) => {
    const inputValue = Number(e.target.value);
    if (inputValue >= 0) {
      setTime(inputValue * 60); // Convert minutes to seconds
    }
  };

  // Format time in MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Start the timer
  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  // Pause the timer
  const pauseTimer = () => {
    setIsPaused(true);
  };

  // Reset the timer
  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
  };

  return (
    <div className="min-h-screen bg-purple-800 flex items-center justify-center">
      <div className="bg-purple-400 p-8 rounded-lg shadow-lg max-w-xs text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-700">Countdown Timer</h1>

        {/* Display the time */}
        <div className="text-6xl font-mono text-gray-800 mb-6">{formatTime(time)}</div>

        {/* Input field to set timer */}
        {!isActive && (
          <div className="mb-6">
            <input
              type="number"
              min="0"
              className="p-2 border rounded-lg w-full text-center text-xl"
              placeholder="Enter time in minutes"
              onChange={handleChange}
            />
          </div>
        )}

        {/* Buttons to start, pause, and reset the timer */}
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            onClick={startTimer}
            disabled={isActive && !isPaused}
          >
            Start
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-700 transition duration-300"
            onClick={pauseTimer}
            disabled={!isActive || isPaused}
          >
            Pause
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
