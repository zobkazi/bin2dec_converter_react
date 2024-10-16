import React, { useEffect, useState } from "react";

const BrowserWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const refreshSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Browser Window Size</h1>

        <div className="text-lg mb-4">
          <p>
            Width: <span className="font-semibold">{windowSize.width}px</span>
          </p>
          <p>
            Height: <span className="font-semibold">{windowSize.height}px</span>
          </p>
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={refreshSize}
        >
          Refresh Size
        </button>
      </div>
    </div>
  );
};

export default BrowserWindowSize;
