import React, { useState } from 'react';

const MultiplicationTable = () => {
  const [number, setNumber] = useState('');
  const [table, setTable] = useState([]);

  const handleGenerateTable = () => {
    if (!isNaN(number) && number !== '') {
      const tableArray = [];
      for (let i = 1; i <= 10; i++) {
        tableArray.push(`${number} x ${i} = ${number * i}`);
      }
      setTable(tableArray);
    } else {
      setTable([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleGenerateTable();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Multiplication Table Generator</h1>
        
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a number"
          className="border rounded-lg p-2 w-full mb-4"
        />

        <button
          onClick={handleGenerateTable}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full"
        >
          Generate Table
        </button>

        {table.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Multiplication Table for {number}:</h2>
            <ul className="text-gray-700">
              {table.map((row, index) => (
                <li key={index} className="py-1">{row}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiplicationTable;
