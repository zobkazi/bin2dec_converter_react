
import  { useState } from 'react';
import { evaluate } from 'mathjs'; // Ensure to install this package

const ScientificCalculator = () => {
  const [calcScreen, setCalcScreen] = useState(''); // Store the current input

  // Update the screen when buttons are clicked
  const updateScreen = (value) => {
    setCalcScreen((prev) => prev + value);
  };

  // Clear the screen
  const clearScreen = () => {
    setCalcScreen('');
  };

  // Handle evaluation of the equation
  const handleEquals = () => {
    try {
      const result = evaluate(calcScreen);
      setCalcScreen(result.toString());
    } catch {
      setCalcScreen('Error');
    }
  };

  // Handle deletion of the last character
  const handleDelete = () => {
    setCalcScreen((prev) => prev.slice(0, -1));
  };

  // Define the layout of special buttons, numbers, and functions
  const specialButtons = ['(', ')', 'clear', 'del'];
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
  const functions = ['+', '-', '*', '/', '='];

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gray-200">
      <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-xs">
        <textarea
          className="w-full bg-gray-100 text-right p-3 rounded-lg h-20 mb-4 text-2xl"
          value={calcScreen}
          readOnly
        />
        
        {/* Button Layout */}
        <div className="grid grid-cols-4 gap-4">
          {/* Special Buttons */}
          {specialButtons.map((button) => (
            <button
              key={button}
              onClick={() =>
                button === 'clear'
                  ? clearScreen()
                  : button === 'del'
                  ? handleDelete()
                  : updateScreen(button)
              }
              className="bg-blue-500 text-white font-bold py-2 rounded-lg"
            >
              {button}
            </button>
          ))}

          {/* Number Buttons */}
          {numbers.map((number) => (
            <button
              key={number}
              onClick={() => updateScreen(number)}
              className="bg-gray-300 text-black font-bold py-2 rounded-lg"
            >
              {number}
            </button>
          ))}

          {/* Function Buttons */}
          {functions.map((func) => (
            <button
              key={func}
              onClick={() => (func === '=' ? handleEquals() : updateScreen(func))}
              className="bg-green-500 text-white font-bold py-2 rounded-lg"
            >
              {func}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;
