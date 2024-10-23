import { useState, useEffect } from "react";
import {toast, Icons, Bounce, ToastContainer} from 'react-toastify'


const Timer = () => {
  // Timer state
  const [time, setTime] = useState(0); // Time in seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showAddTime, setShowAddTime] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  // Effect for countdown
  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      setIsActive(false);
      setIsPaused(false);
      toast.warning("Time's up! Congratulations!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        icon: Icons.Timer
      });
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, time]);

  // Handle input change for setting the timer in hours, minutes, and seconds
  const handleChange = (e) => {
    const { name, value } = e.target;
    const inputValue = Number(value);
    
    // Validate input
    if (value === "" || isNaN(inputValue) || inputValue < 0) {
      setErrorMessage("Please enter a valid non-negative number");
      return;
    } else {
      setErrorMessage(""); // Clear error message if input is valid
    }

    if (name === "hours") {
      setTime((prev) => prev + inputValue * 3600); // Convert hours to seconds
    } else if (name === "minutes") {
      setTime((prev) => prev + inputValue * 60); // Convert minutes to seconds
    } else if (name === "seconds") {
      setTime((prev) => prev + inputValue); // Already in seconds
    }
  };

  // Format time in HH:MM:SS format
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Start the timer
  const startTimer = () => {
    if (time <= 0) {
      setErrorMessage("Please set a valid time to start the timer");
      return;
    }
    setIsActive(true);
    setIsPaused(false);
    setErrorMessage("");
    toast.success("Timer started! Good luck!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      icon: Icons.Timer
    })
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
    setErrorMessage(""); // Clear error message on reset
  };

  // Show option to add more time
  const toggleAddTime = () => {
    setShowAddTime((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-purple-800 flex items-center justify-center">
      <div className="bg-purple-400 p-6 rounded-lg shadow-lg max-w-lg text-center">
        <h1 className="text-3xl font-bold p-3 mb-4 text-gray-700">Countdown Timer</h1>

        {/* Display the time */}
        <div className="text-6xl font-mono text-gray-800 mb-6">{formatTime(time)}</div>

        {/* Error message */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {/* Input fields to set timer */}
        {!isActive && (
          <div className="mb-6 grid gap-4 grid-cols-3">
            <input
              type="number"
              name="hours"
              min="0"
              className="p-2 border rounded-lg text-center text-xl"
              placeholder="HH"
              onChange={handleChange}
            />
            <input
              type="number"
              name="minutes"
              min="0"
              className="p-2 border rounded-lg text-center text-xl"
              placeholder="MM"
              onChange={handleChange}
            />
            <input
              type="number"
              name="seconds"
              min="0"
              className="p-2 border rounded-lg text-center text-xl"
              placeholder="SS"
              onChange={handleChange}
            />
          </div>
        )}

        {/* Buttons to start, pause, reset the timer, and add more time */}
        <div className="flex justify-between mb-4">
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

        {/* Option to add more time */}
        {isActive && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300 mb-4"
            onClick={toggleAddTime}
          >
            Add More Time
          </button>
        )}

        {showAddTime && (
          <div className="grid gap-4 grid-cols-3">
            <input
              type="number"
              name="hours"
              min="0"
              className="p-2 border rounded-lg text-center text-xl"
              placeholder="HH"
              onChange={handleChange}
            />
            <input
              type="number"
              name="minutes"
              min="0"
              className="p-2 border rounded-lg text-center text-xl"
              placeholder="MM"
              onChange={handleChange}
            />
            <input
              type="number"
              name="seconds"
              min="0"
              className="p-2 border rounded-lg text-center text-xl"
              placeholder="SS"
              onChange={handleChange}
            />
          </div>
        )}
      </div>

      {/* Add more time message */}
      {showAddTime && (
        <div className="text-gray-500 text-center mt-4">
          <p className="text-lg">Add more time to your timer</p>
        </div>
      )}

<ToastContainer />

    </div>
  );
};

export default Timer;
