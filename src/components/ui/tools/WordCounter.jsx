import React, { useState } from 'react';

const WordCounter = () => {
  const [text, setText] = useState('');

  const countWords = (text) => {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  };

  const countCharacters = (text) => {
    return text.length;
  };

  const countLines = (text) => {
    return text.trim() === '' ? 0 : text.split('\n').length;
  };

  const wordCount = countWords(text);
  const characterCount = countCharacters(text);
  const lineCount = countLines(text);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-semibold mb-4 text-blue-600">Word Counter</h1>
      <textarea
        className="border border-gray-300 p-2 rounded w-full h-40 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="text-left">
        <p className="font-medium">Word Count: <span className="font-semibold">{wordCount}</span></p>
        <p className="font-medium">Character Count: <span className="font-semibold">{characterCount}</span></p>
        <p className="font-medium">Line Count: <span className="font-semibold">{lineCount}</span></p>
      </div>
    </div>
  );
};

export default WordCounter;

