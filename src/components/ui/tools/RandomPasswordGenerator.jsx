import React, { useState } from 'react';

const RandomPasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(60);
  const [password, setPassword] = useState('');
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  const generatePassword = () => {
    let characterSet = '';
    const similarChars = '1lIioO0';

    if (useUppercase) characterSet += 'ABCDEFGHJKLMNOPQRSTUVWXYZ'; // A-Z without similar
    if (useLowercase) characterSet += 'abcdefghijkmnopqrstuvwxyz'; // a-z without similar
    if (useNumbers) characterSet += '23456789'; // 0-9 without similar
    if (useSymbols) characterSet += '!@#$%^&*=';
    
    let generatedPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characterSet.length);
      generatedPassword += characterSet[randomIndex];
    }
    
    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  const resetForm = () => {
    setPasswordLength(60);
    setPassword('');
    setUseUppercase(true);
    setUseLowercase(true);
    setUseNumbers(true);
    setUseSymbols(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      generatePassword();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
      <h1 className="text-3xl font-semibold mb-6 text-blue-600">Random Password Generator</h1>
      <div className="mb-4">
        <label className="block mb-1 text-left font-medium">Password Length:</label>
        <input 
          type="number" 
          value={passwordLength} 
          onChange={(e) => setPasswordLength(e.target.value)} 
          min="1" 
          max="100" 
          onKeyDown={handleKeyDown} // Add the key down event handler
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-4 text-left">
        <label className="block mb-1 font-medium">Include:</label>
        <label className="flex items-center mb-2">
          <input 
            type="checkbox" 
            checked={useUppercase} 
            onChange={() => setUseUppercase(!useUppercase)} 
            className="mr-2" 
          /> 
          <span>Uppercase Letters (A-Z)</span>
        </label>
        <label className="flex items-center mb-2">
          <input 
            type="checkbox" 
            checked={useLowercase} 
            onChange={() => setUseLowercase(!useLowercase)} 
            className="mr-2" 
          /> 
          <span>Lowercase Letters (a-z)</span>
        </label>
        <label className="flex items-center mb-2">
          <input 
            type="checkbox" 
            checked={useNumbers} 
            onChange={() => setUseNumbers(!useNumbers)} 
            className="mr-2" 
          /> 
          <span>Digits (0-9)</span>
        </label>
        <label className="flex items-center mb-4">
          <input 
            type="checkbox" 
            checked={useSymbols} 
            onChange={() => setUseSymbols(!useSymbols)} 
            className="mr-2" 
          /> 
          <span>Symbols (!@#$%^&*)</span>
        </label>
      </div>
      <button 
        onClick={generatePassword} 
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-transform duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Generate Password
      </button>
      {password && (
        <div className="mt-6">
          <p className="text-xl font-semibold">Generated Password:</p>
          <p className="font-mono text-lg border border-gray-300 p-2 rounded mt-2 bg-gray-50">{password}</p>
          <button 
            onClick={copyToClipboard} 
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg mt-2 transition-transform duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Copy Password
          </button>
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

export default RandomPasswordGenerator;
