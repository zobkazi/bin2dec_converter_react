import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const WebsiteTrafficTracker = () => {
  const [trafficData, setTrafficData] = useState([]);
  const [dateInput, setDateInput] = useState('');
  const [trafficInput, setTrafficInput] = useState('');

  const handleAddData = () => {
    if (dateInput && trafficInput) {
      const newData = { date: dateInput, traffic: Number(trafficInput) };
      setTrafficData([...trafficData, newData]);
      setDateInput('');
      setTrafficInput('');
    }
  };

  const data = {
    labels: trafficData.map(item => item.date),
    datasets: [
      {
        label: 'Website Traffic',
        data: trafficData.map(item => item.traffic),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Website Traffic Tracker</h1>
      
      <div className="mb-6">
        <input
          type="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          className="border rounded-lg p-2 w-1/3 mr-2"
        />
        <input
          type="number"
          placeholder="Traffic Count"
          value={trafficInput}
          onChange={(e) => setTrafficInput(e.target.value)}
          className="border rounded-lg p-2 w-1/3 mr-2"
        />
        <button
          onClick={handleAddData}
          className="bg-blue-500 text-white rounded-lg px-4 py-2"
        >
          Add Data
        </button>
      </div>

      {trafficData.length > 0 && (
        <div>
          <Line data={data} />
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Traffic Summary</h2>
            <p>Total Visits: {trafficData.reduce((acc, curr) => acc + curr.traffic, 0)}</p>
            <p>Average Visits: {(trafficData.reduce((acc, curr) => acc + curr.traffic, 0) / trafficData.length).toFixed(2)}</p>
            <p>Max Visits: {Math.max(...trafficData.map(item => item.traffic))}</p>
            <p>Min Visits: {Math.min(...trafficData.map(item => item.traffic))}</p>
          </div>
        </div>
      )}
      
      {trafficData.length === 0 && (
        <p className="text-center text-gray-500">No traffic data available. Please add some!</p>
      )}
    </div>
  );
};

export default WebsiteTrafficTracker;
