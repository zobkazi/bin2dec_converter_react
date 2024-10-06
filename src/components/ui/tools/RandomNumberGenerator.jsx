import React, { useState } from 'react';

const RandomNumberGenerator = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [randomNumber, setRandomNumber] = useState(null);

  const generateRandomNumber = () => {
    if (min >= max) {
      alert('Please ensure that the minimum value is less than the maximum value.');
      return;
    }
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(number);
  };

  const resetForm = () => {
    setMin(1);
    setMax(100);
    setRandomNumber(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      generateRandomNumber();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
      <h1 className="text-3xl font-semibold mb-6 text-blue-600">Random Number Generator</h1>
      <div className="mb-4">
        <label className="block mb-1 text-left font-medium">Minimum Value:</label>
        <input 
          type="number" 
          value={min} 
          onChange={(e) => setMin(Number(e.target.value))} 
          onKeyDown={handleKeyDown} 
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-left font-medium">Maximum Value:</label>
        <input 
          type="number" 
          value={max} 
          onChange={(e) => setMax(Number(e.target.value))} 
          onKeyDown={handleKeyDown} 
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <button 
        onClick={generateRandomNumber} 
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-transform duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Generate Random Number
      </button>
      {randomNumber !== null && (
        <div className="mt-6">
          <p className="text-xl font-semibold">Generated Random Number:</p>
          <p className="font-mono text-lg border border-gray-300 p-2 rounded mt-2 bg-gray-50">{randomNumber}</p>
        </div>
      )}
      <button 
        onClick={resetForm} 
        className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg mt-4 transition-transform duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        Reset
      </button>
    </div>
  );
};

export default RandomNumberGenerator;
