import React, { useState } from 'react';

const UrlEncoder = () => {
  const [inputValue, setInputValue] = useState('');
  const [encodedValue, setEncodedValue] = useState('');
  const [copied, setCopied] = useState(false);

  const encodeUrl = () => {
    const encoded = encodeURIComponent(inputValue);
    setEncodedValue(encoded);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(encodedValue).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Show copied message for 2 seconds
    });
  };

  const resetFields = () => {
    setInputValue('');
    setEncodedValue('');
    setCopied(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-4">URL Encoder</h1>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Enter URL or String:</label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter URL or string to encode"
          />
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mb-4"
          onClick={encodeUrl}
        >
          Encode URL
        </button>

        {encodedValue && (
          <div className="mt-4">
            <h2 className="font-semibold">Encoded URL:</h2>
            <div
              className="bg-gray-200 p-2 rounded-lg cursor-pointer"
              onClick={copyToClipboard}
            >
              {encodedValue}
            </div>
            <div className="text-sm text-green-600 mt-1">
              {copied ? 'Encoded URL Copied!' : ''}
            </div>
          </div>
        )}

        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
          onClick={resetFields}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default UrlEncoder;
