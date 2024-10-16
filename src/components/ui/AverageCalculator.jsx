import { useState } from "react";

const EnhancedAverageCalculator = () => {
  const [numbers, setNumbers] = useState("");
  const [results, setResults] = useState(null);

  // Helper functions for different calculations
  const calculateMean = (nums) =>
    (nums.reduce((acc, curr) => acc + curr, 0) / nums.length).toFixed(2);
  const calculateSum = (nums) => nums.reduce((acc, curr) => acc + curr, 0);
  const calculateGeometricMean = (nums) =>
    Math.pow(
      nums.reduce((acc, curr) => acc * curr, 1),
      1 / nums.length
    ).toFixed(2);
  const calculateRMS = (nums) =>
    Math.sqrt(
      nums.reduce((acc, curr) => acc + curr ** 2, 0) / nums.length
    ).toFixed(2);
  const calculateMedian = (nums) => {
    const sortedNums = [...nums].sort((a, b) => a - b);
    const mid = Math.floor(sortedNums.length / 2);
    return (
      sortedNums.length % 2 === 0
        ? (sortedNums[mid - 1] + sortedNums[mid]) / 2
        : sortedNums[mid]
    ).toFixed(2);
  };
  const calculateMode = (nums) => {
    const modeMap = {};
    let maxFreq = 0;
    let mode = nums[0];

    nums.forEach((num) => {
      modeMap[num] = (modeMap[num] || 0) + 1;
      if (modeMap[num] > maxFreq) {
        maxFreq = modeMap[num];
        mode = num;
      }
    });

    return mode;
  };
  const calculatePopulationSD = (nums, mean) => {
    const variance =
      nums.reduce((acc, curr) => acc + (curr - mean) ** 2, 0) / nums.length;
    return Math.sqrt(variance).toFixed(2);
  };
  const calculateSampleSD = (nums, mean) => {
    const variance =
      nums.reduce((acc, curr) => acc + (curr - mean) ** 2, 0) /
      (nums.length - 1);
    return Math.sqrt(variance).toFixed(2);
  };

  const handleCalculateResults = () => {
    const numberArray = numbers
      .split(",")
      .map((num) => parseFloat(num.trim()))
      .filter((num) => !isNaN(num));

    if (numberArray.length > 0) {
      const sum = calculateSum(numberArray);
      const mean = calculateMean(numberArray);
      const geometricMean = calculateGeometricMean(numberArray);
      const rms = calculateRMS(numberArray);
      const median = calculateMedian(numberArray);
      const mode = calculateMode(numberArray);
      const populationSD = calculatePopulationSD(numberArray, mean);
      const sampleSD =
        numberArray.length > 1 ? calculateSampleSD(numberArray, mean) : "NaN";
      const minValue = Math.min(...numberArray);
      const maxValue = Math.max(...numberArray);
      const range = maxValue - minValue;

      setResults({
        mean,
        count: numberArray.length,
        sum,
        geometricMean,
        rms,
        median,
        mode,
        populationSD,
        sampleSD,
        minValue,
        maxValue,
        range,
        values: numberArray,
      });
    } else {
      setResults(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCalculateResults();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Enhanced Average Calculator
        </h1>

        <input
          type="text"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter numbers separated by commas"
          className="border rounded-lg p-2 w-full mb-4"
        />

        <button
          onClick={handleCalculateResults}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full"
        >
          Calculate
        </button>

        {results && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Results:</h2>
            <ul className="text-sm text-gray-700">
              <li>
                <strong>Average (Mean):</strong> {results.mean}
              </li>
              <li>
                <strong>Count:</strong> {results.count}
              </li>
              <li>
                <strong>Sum:</strong> {results.sum}
              </li>
              <li>
                <strong>Geometric Mean:</strong> {results.geometricMean}
              </li>
              <li>
                <strong>Root Mean Square (RMS):</strong> {results.rms}
              </li>
              <li>
                <strong>Median:</strong> {results.median}
              </li>
              <li>
                <strong>Mode:</strong> {results.mode}
              </li>
              <li>
                <strong>Population SD:</strong> {results.populationSD}
              </li>
              <li>
                <strong>Sample SD:</strong> {results.sampleSD}
              </li>
              <li>
                <strong>Min Value:</strong> {results.minValue}
              </li>
              <li>
                <strong>Max Value:</strong> {results.maxValue}
              </li>
              <li>
                <strong>Range:</strong> {results.range}
              </li>
            </ul>

            {/* Graph of values */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Values Graph:</h3>
              <div className="flex items-end space-x-2">
                {results.values.map((value, index) => (
                  <div
                    key={index}
                    className="bg-blue-400 w-6"
                    style={{ height: `${(value / results.maxValue) * 100}%` }}
                  >
                    <p className="text-center text-xs">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedAverageCalculator;
