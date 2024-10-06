import React, { useState } from 'react';

const RedirectCodeGenerator = () => {
  const [oldUrl, setOldUrl] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [redirectType, setRedirectType] = useState('php');
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);

  const generateCode = () => {
    let code = '';
    
    switch (redirectType) {
      case 'php':
        code = `header('Location: ${newUrl}', true, 301);`;
        break;
      case 'asp':
        code = `<%
Response.Redirect("${newUrl}", true)
%>`;
        break;
      case 'apache':
        code = `Redirect 301 ${oldUrl} ${newUrl}`;
        break;
      case 'html':
        code = `<meta http-equiv="refresh" content="0;url=${newUrl}">`;
        break;
      case 'javascript':
        code = `window.location.href = "${newUrl}";`;
        break;
      default:
        code = `Redirect ${redirectType} ${oldUrl} ${newUrl}`; // Default for other types
    }

    setGeneratedCode(code);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Show copied message for 2 seconds
    });
  };

  const resetFields = () => {
    setOldUrl('');
    setNewUrl('');
    setRedirectType('php');
    setGeneratedCode('');
    setCopied(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-4">301 Redirect Code Generator</h1>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Enter URL of old page:</label>
          <input
            type="text"
            value={oldUrl}
            onChange={(e) => setOldUrl(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Enter URL of new page:</label>
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Select redirect type:</label>
          <select
            value={redirectType}
            onChange={(e) => setRedirectType(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="php">PHP Redirect</option>
            <option value="asp">ASP Redirect</option>
            <option value="apache">Apache .htaccess Redirect</option>
            <option value="html">HTML Meta Tag Redirect</option>
            <option value="javascript">JavaScript Redirect</option>
          </select>
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mb-4"
          onClick={generateCode}
        >
          Generate Code
        </button>

        {generatedCode && (
          <div className="mt-4">
            <h2 className="font-semibold">Generated Code:</h2>
            <div
              className="bg-gray-200 p-2 rounded-lg cursor-pointer"
              onClick={copyToClipboard}
            >
              {generatedCode}
            </div>
            <div className="text-sm text-green-600 mt-1">
              {copied ? 'Code Copied!' : ''}
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

export default RedirectCodeGenerator;
