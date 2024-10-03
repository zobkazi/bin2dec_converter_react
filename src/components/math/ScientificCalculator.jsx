import { useState } from 'react';
import { create, all } from 'mathjs';

// Create a math instance
const math = create(all);

const Calculator = () => {
  const [input, setInput] = useState('');
  const [isOn, setIsOn] = useState(true); // On/Off state

  // Handle input for numbers and operations
  const handleInput = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  // Calculate result
  const calculateResult = () => {
    try {
      // Use math.js for evaluation
      const result = math.evaluate(input);
      setInput(result.toString());
    } catch (error) {
      setInput('Error');
    }
  };

  // Clear input
  const clearInput = () => setInput('');

  // Delete last input
  const deleteLast = () => setInput(input.slice(0, -1));


    // Toggle On/Off state
    const togglePower = () => {
        setIsOn((prev) => !prev);
        if (isOn) {
          setInput(''); // Clear input when switching off
        }
      };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray-100 text-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <div className="bg-black p-4 rounded-md mb-3 text-right text-2xl font-mono text-green-400 h-20 flex items-center justify-end">
        {isOn ? (input || '0') : 'OFF'}
        </div>

        <div className="grid grid-cols-5 gap-2 text-center">
          {/* Function keys */}
          <button onClick={clearInput} className="btn-gray">AC</button>
          <button onClick={deleteLast} className="btn-gray">DEL</button>
          <button onClick={() => handleInput('(')} className="btn-gray">(</button>
          <button onClick={() => handleInput(')')} className="btn-gray">)</button>
          <div className='flex justify-between items-center btn-gray'>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only" checked={isOn} onChange={togglePower} />
            <div className={`w-10 h-6 rounded-full ${isOn ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className={`absolute left-0.5 top-0.5 w-5 h-5 rounded-full transition transform ${isOn ? 'translate-x-full bg-white' : 'bg-white'}`}></span>
          </label>
          </div>
          
          
          
       

          {/* Numbers and basic functions */}
          <button onClick={() => handleInput('7')} className="btn-dark">7</button>
          <button onClick={() => handleInput('8')} className="btn-dark">8</button>
          <button onClick={() => handleInput('9')} className="btn-dark">9</button>
          <button onClick={() => handleInput('*')} className="btn-orange">×</button>

          {/* Scientific functions */}
          <button onClick={() => handleInput('sin(')} className="btn-gray">sin</button>
          <button onClick={() => handleInput('4')} className="btn-dark">4</button>
          <button onClick={() => handleInput('5')} className="btn-dark">5</button>
          <button onClick={() => handleInput('6')} className="btn-dark">6</button>
          <button onClick={() => handleInput('-')} className="btn-orange">−</button>

          <button onClick={() => handleInput('cos(')} className="btn-gray">cos</button>
          <button onClick={() => handleInput('1')} className="btn-dark">1</button>
          <button onClick={() => handleInput('2')} className="btn-dark">2</button>
          <button onClick={() => handleInput('3')} className="btn-dark">3</button>
          <button onClick={() => handleInput('+')} className="btn-orange">+</button>

          <button onClick={() => handleInput('tan(')} className="btn-gray">tan</button>
         
          <button onClick={() => handleInput('0')} className="btn-dark col-span-2">0</button>
          <button onClick={() => handleInput('.')} className="btn-dark">.</button>

          <button onClick={() => handleInput('/')} className="btn-orange">+</button>

          <button onClick={() => handleInput('log(')} className="btn-gray">log</button>
          <button onClick={() => handleInput('sqrt(')} className="btn-gray">√</button>
          <button onClick={() => handleInput('%')} className="btn-gray">%</button>
          <button onClick={() => handleInput('^')} className="btn-gray">x^y</button>
          <button onClick={calculateResult} className="btn-orange col-span-2">Ans</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
