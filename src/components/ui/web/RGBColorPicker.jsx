import React, { useState } from 'react';

const RGBColorPicker = () => {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [copied, setCopied] = useState(false);

  // Predefined color moods
  const colorMoods = {
    Calm: [
      { name: 'Light Blue', rgb: 'rgb(173, 216, 230)' },
      { name: 'Lavender', rgb: 'rgb(230, 230, 250)' },
      { name: 'Mint Green', rgb: 'rgb(152, 251, 152)' },
    ],
    Energetic: [
      { name: 'Vibrant Orange', rgb: 'rgb(255, 165, 0)' },
      { name: 'Bright Yellow', rgb: 'rgb(255, 255, 0)' },
      { name: 'Hot Pink', rgb: 'rgb(255, 20, 147)' },
    ],
    Warm: [
      { name: 'Coral', rgb: 'rgb(255, 127, 80)' },
      { name: 'Goldenrod', rgb: 'rgb(218, 165, 32)' },
      { name: 'Tomato', rgb: 'rgb(255, 99, 71)' },
    ],
    Cool: [
      { name: 'Teal', rgb: 'rgb(0, 128, 128)' },
      { name: 'Slate Blue', rgb: 'rgb(106, 90, 205)' },
      { name: 'Medium Sea Green', rgb: 'rgb(60, 179, 113)' },
    ],
  };

  // Copy RGB code to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Show copied message for 2 seconds
    });
  };

  const rgbColor = `rgb(${red}, ${green}, ${blue})`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-4">RGB Color Picker</h1>

        {/* Color display */}
        <div className="h-32 w-full mb-6 rounded-lg" style={{ backgroundColor: rgbColor }}></div>

        {/* Sliders for Red, Green, and Blue */}
        <div className="mb-4">
          <label className="block font-semibold mb-2 text-red-500">Red: {red}</label>
          <input
            type="range"
            min="0"
            max="255"
            value={red}
            onChange={(e) => setRed(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2 text-green-500">Green: {green}</label>
          <input
            type="range"
            min="0"
            max="255"
            value={green}
            onChange={(e) => setGreen(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2 text-blue-500">Blue: {blue}</label>
          <input
            type="range"
            min="0"
            max="255"
            value={blue}
            onChange={(e) => setBlue(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Display the RGB Code */}
        <div className="mt-4 text-xl font-semibold">
          RGB: {rgbColor}
        </div>

        {/* Button to copy RGB code */}
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={() => copyToClipboard(rgbColor)}
        >
          {copied ? 'RGB Copied!' : 'Copy RGB'}
        </button>

        {/* Suggested Color Moods */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Color Moods</h2>
          {Object.keys(colorMoods).map((mood) => (
            <div key={mood} className="mb-4">
              <h3 className="font-semibold">{mood}</h3>
              <div className="flex space-x-4">
                {colorMoods[mood].map((color) => (
                  <div
                    key={color.name}
                    className="flex flex-col items-center"
                    style={{ backgroundColor: color.rgb, padding: '10px', borderRadius: '5px', width: '100px', color: '#fff' }}
                  >
                    <div>{color.name}</div>
                    <button
                      className="mt-1 bg-gray-800 text-white px-2 py-1 rounded"
                      onClick={() => {
                        setRed(parseInt(color.rgb.split(',')[0].split('(')[1]));
                        setGreen(parseInt(color.rgb.split(',')[1]));
                        setBlue(parseInt(color.rgb.split(',')[2].split(')')[0]));
                        copyToClipboard(color.rgb);
                      }}
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RGBColorPicker;
