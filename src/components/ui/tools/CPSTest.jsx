import React, { useState, useEffect } from "react";

const CPSTest = () => {
  const [clicks, setClicks] = useState(0);
  const [isTesting, setIsTesting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5); // Test duration in seconds
  const [finalCPS, setFinalCPS] = useState(null);

  const handleClick = () => {
    if (isTesting) {
      setClicks((prevClicks) => prevClicks + 1);
    }
  };

  const startTest = () => {
    setClicks(0);
    setIsTesting(true);
    setFinalCPS(null);
    setTimeLeft(5);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsTesting(false);
          setFinalCPS(clicks);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    // Reset the clicks when the test ends
    if (!isTesting) {
      setClicks(0);
    }
  }, [isTesting]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">CPS Test</h1>

      {isTesting ? (
        <div>
          <p className="text-xl">Time Left: {timeLeft}s</p>
          <button
            onClick={handleClick}
            className="bg-blue-500 text-white p-4 rounded mt-4"
          >
            Click Me!
          </button>
        </div>
      ) : (
        <div>
          <p className="text-xl">
            {finalCPS !== null
              ? `Your CPS: ${finalCPS}`
              : "Press the button to start the test!"}
          </p>
          <button
            onClick={startTest}
            className="bg-green-500 text-white p-4 rounded mt-4"
          >
            Start Test
          </button>
        </div>
      )}
    </div>
  );
};

export default CPSTest;
