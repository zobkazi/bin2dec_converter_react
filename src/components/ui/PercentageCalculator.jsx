import React, { useState } from 'react';

const PercentageCalculator = () => {
  const [part, setPart] = useState('');
  const [whole, setWhole] = useState('');
  const [percentage, setPercentage] = useState(null);

  const handleCalculate = () => {
    if (part !== '' && whole !== '' && !isNaN(part) && !isNaN(whole) && whole !== '0') {
      const result = (parseFloat(part) / parseFloat(whole)) * 100;
      setPercentage(result.toFixed(2));
    } else {
      setPercentage(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Percentage Calculator</h1>

        <input
          type="text"
          value={part}
          onChange={(e) => setPart(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter the part value"
          className="border rounded-lg p-2 w-full mb-4"
        />

        <input
          type="text"
          value={whole}
          onChange={(e) => setWhole(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter the whole value"
          className="border rounded-lg p-2 w-full mb-4"
        />

        <button
          onClick={handleCalculate}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full"
        >
          Calculate Percentage
        </button>

        {percentage !== null && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">Result: {percentage}%</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PercentageCalculator;
