import { useState } from 'react';

const FocusedConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [conversionType, setConversionType] = useState('asciiToBinary');
  const [result, setResult] = useState('');

  const conversionOptions = [
    { label: 'ASCII to Binary', value: 'asciiToBinary' },
    { label: 'Binary to Decimal', value: 'binaryToDecimal' },
    { label: 'Decimal to Hex', value: 'decimalToHex' },
    { label: 'Hex to Decimal', value: 'hexToDecimal' },
    { label: 'Fraction to Decimal', value: 'fractionToDecimal' },
    { label: 'Degrees to Radians', value: 'degreesToRadians' },
    { label: 'Radians to Degrees', value: 'radiansToDegrees' },
  ];

  const handleConvert = () => {
    let conversionResult = '';
    switch (conversionType) {
      case 'asciiToBinary':
        conversionResult = inputValue
          .split('')
          .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
          .join(' ');
        break;
      case 'binaryToDecimal':
        conversionResult = parseInt(inputValue, 2);
        break;
      case 'decimalToHex':
        conversionResult = (parseInt(inputValue, 10) || 0).toString(16).toUpperCase();
        break;
      case 'hexToDecimal':
        conversionResult = parseInt(inputValue, 16);
        break;
      case 'fractionToDecimal':
        { const [numerator, denominator] = inputValue.split('/');
        conversionResult = (parseFloat(numerator) / parseFloat(denominator)).toFixed(5);
        break; }
      case 'degreesToRadians':
        conversionResult = (parseFloat(inputValue) * (Math.PI / 180)).toFixed(5);
        break;
      case 'radiansToDegrees':
        conversionResult = (parseFloat(inputValue) * (180 / Math.PI)).toFixed(5);
        break;
      default:
        conversionResult = 'Invalid conversion type';
    }
    setResult(conversionResult);
  };

  // Function to handle "Enter" key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleConvert();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Popular Converters</h1>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown} 
          placeholder="Enter a value"
          className="border rounded-lg p-2 w-full mb-4"
        />

        <select
          value={conversionType}
          onChange={(e) => setConversionType(e.target.value)}
          className="border rounded-lg p-2 w-full mb-4"
        >
          {conversionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          onClick={handleConvert}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full"
        >
          Convert
        </button>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2 text-center">Result:</h2>
          <div className="text-sm text-gray-700">
            <p>
              <strong className='text-gray-800 text-4xl text-center'>Converted Value:</strong> <span className="text-gray-900 text-3xl">{result}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusedConverter;
